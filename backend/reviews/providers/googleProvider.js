import qs from "querystring";
import { getTokens, saveTokens } from "../../google/tokenStore.js";

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const REVIEWS_BASE = "https://mybusiness.googleapis.com/v4";

function ensureEnv() {
  const missing = [];
  if (!process.env.GOOGLE_CLIENT_ID) missing.push("GOOGLE_CLIENT_ID");
  if (!process.env.GOOGLE_CLIENT_SECRET) missing.push("GOOGLE_CLIENT_SECRET");
  if (missing.length) throw new Error(`Missing env vars: ${missing.join(", ")}`);
}

async function refreshAccessTokenIfNeeded(tokens) {
  if (!tokens) return null;
  const obtained = tokens.obtained_at ? Date.parse(tokens.obtained_at) : 0;
  const expiresIn = Number(tokens.expires_in || 0);
  const willExpireAt = obtained + (expiresIn * 1000);
  const now = Date.now();
  if (!tokens.access_token || !tokens.refresh_token || now + 60000 >= willExpireAt) {
    try {
      ensureEnv();
      const body = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: tokens.refresh_token,
        grant_type: "refresh_token",
      };
      const res = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: qs.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error("GoogleProvider: failed to refresh token", { status: res.status });
        return null;
      }
      const updated = {
        access_token: data.access_token,
        refresh_token: data.refresh_token || tokens.refresh_token,
        expires_in: data.expires_in,
        obtained_at: new Date().toISOString(),
      };
      saveTokens("google_business", updated);
      return updated;
    } catch (err) {
      console.error("GoogleProvider: refresh error", err && err.message ? err.message : err);
      return null;
    }
  }
  return tokens;
}

async function callReviewsApi(locationResourceName, accessToken, pageSize = 50, pageToken) {
  const encodedResourceName = locationResourceName
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  const url = `${REVIEWS_BASE}/${encodedResourceName}/reviews?pageSize=${pageSize}${pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : ""}`;
  console.info("GoogleProvider: reviews request", {
    locationResourceName,
    url,
    pageSize,
    pageToken: pageToken || null,
  });

  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  const body = await res.json().catch(() => null);

  const error = body && body.error ? body.error : null;
  if (!res.ok) {
    console.error("GoogleProvider: upstream Google API error", {
      httpStatus: res.status,
      googleErrorCode: error?.code ?? null,
      googleErrorMessage: error?.message ?? null,
      googleErrorStatus: error?.status ?? null,
      responseBody: body ?? null,
      requestUrl: url,
    });
  }

  return { status: res.status, body };
}

export async function getReviews({ location, rating, sort, limit = 10, page = 1 } = {}) {
  if (!location) throw { code: "MISSING_LOCATION", message: "location param required for Google provider" };
  const tokens = getTokens("google_business");
  if (!tokens) throw { code: "NO_TOKENS", message: "No Google OAuth tokens found" };

  const valid = await refreshAccessTokenIfNeeded(tokens);
  if (!valid) throw { code: "REFRESH_FAILED", message: "Failed to refresh access token" };

  // aggregate pages if needed
  const pageSize = Math.min(50, Number(limit) || 10);
  const pageIndex = Math.max(1, Number(page) || 1);
  const pageToken = undefined; // for now, we request single page as requested by client

  const { status, body } = await callReviewsApi(location, valid.access_token, pageSize, pageToken);

  if (status === 429) {
    const error = body && body.error ? body.error : null;
    console.warn("GoogleProvider: API returned 429 — likely quota not granted", {
      httpStatus: status,
      googleErrorCode: error?.code ?? null,
      googleErrorMessage: error?.message ?? null,
      googleErrorStatus: error?.status ?? null,
      responseBody: body ?? null,
    });
    throw { code: "QUOTA", message: "Google Business Profile API access not granted or quota exhausted", details: body };
  }
  if (status === 401) {
    const error = body && body.error ? body.error : null;
    console.error("GoogleProvider: token-related upstream error", {
      httpStatus: status,
      googleErrorCode: error?.code ?? null,
      googleErrorMessage: error?.message ?? null,
      googleErrorStatus: error?.status ?? null,
      responseBody: body ?? null,
    });
    throw { code: "TOKEN_INVALID", message: "Access token invalid or expired" };
  }
  if (status >= 400) {
    const error = body && body.error ? body.error : null;
    console.error("GoogleProvider: upstream API error", {
      httpStatus: status,
      googleErrorCode: error?.code ?? null,
      googleErrorMessage: error?.message ?? null,
      googleErrorStatus: error?.status ?? null,
      responseBody: body ?? null,
    });
    throw { code: "API_ERROR", message: "Google API error", status, body };
  }

  const items = Array.isArray(body.reviews) ? body.reviews : [];
  // map to safe shape
  const reviews = items.map(r => ({
    reviewId: r.name || r.reviewId || null,
    reviewerName: r.reviewer?.displayName || r.reviewer?.profileName || null,
    rating: r.starRating || r.starRating || null,
    comment: r.comment || null,
    createTime: r.createTime || r.create_time || null,
    location: location,
    replied: Boolean(r.reviewReply),
    reply: r.reviewReply || null,
  }));

  return { total: reviews.length, page: pageIndex, limit: pageSize, reviews };
}

export default { getReviews };
