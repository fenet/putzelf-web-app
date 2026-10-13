import qs from "querystring";
import { google } from "googleapis";
import { getTokens, saveTokens } from "../../google/tokenStore.js";

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const REVIEWS_BASE = "https://mybusiness.googleapis.com/v4";

function ensureEnv() {
  const missing = [];
  if (!process.env.GOOGLE_CLIENT_ID) missing.push("GOOGLE_CLIENT_ID");
  if (!process.env.GOOGLE_CLIENT_SECRET) missing.push("GOOGLE_CLIENT_SECRET");
  if (!process.env.GOOGLE_REDIRECT_URI) missing.push("GOOGLE_REDIRECT_URI");
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

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI,
      );

      oauth2Client.setCredentials({
        refresh_token: tokens.refresh_token,
      });

      const { credentials } = await oauth2Client.refreshAccessToken();
      const updated = {
        access_token: credentials.access_token,
        refresh_token: credentials.refresh_token || tokens.refresh_token,
        expires_in: credentials.expiry_date ? Math.max(1, Math.floor((credentials.expiry_date - Date.now()) / 1000)) : tokens.expires_in,
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
  function parseRating(raw) {
    if (raw == null) return null;
    if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
    if (typeof raw === "object") {
      if (typeof raw.value === "number") return raw.value;
      if (typeof raw.value === "string") return parseRating(raw.value);
      if (typeof raw.rating === "number") return raw.rating;
      if (typeof raw.rating === "string") return parseRating(raw.rating);
      if (typeof raw.starRating === "number") return raw.starRating;
      if (typeof raw.starRating === "string") return parseRating(raw.starRating);
      return null;
    }
    const s = String(raw).trim();
    if (!s) return null;
    // Numeric-like string
    const numeric = Number(s.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(numeric) && numeric > 0) return numeric;
    // Word forms like ONE, TWO, THREE, FOUR, FIVE
    const map = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
    };
    const up = s.toUpperCase();
    if (map[up]) return map[up];
    return null;
  }

  const reviews = items.map((r) => ({
    reviewId: r.name || r.reviewId || null,
    reviewerName: r.reviewer?.displayName || r.reviewer?.profileName || null,
    rating: parseRating(r.starRating ?? r.rating ?? r.reviewRating ?? null),
    comment: r.comment || null,
    createTime: r.createTime || r.create_time || null,
    location: location,
    replied: Boolean(r.reviewReply),
    reply: r.reviewReply || null,
  }));

  const requestedMin = rating == null ? null : Number(rating);
  const effectiveMin = Number.isFinite(requestedMin) && requestedMin > 0 ? requestedMin : 4;

  const filtered = reviews.filter((r) => {
    if (!r || r.rating == null) return false;
    return Number(r.rating) >= effectiveMin;
  });

  return { total: filtered.length, page: pageIndex, limit: pageSize, reviews: filtered };
}

export default { getReviews };
