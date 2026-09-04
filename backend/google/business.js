import qs from "querystring";
import { getTokens, saveTokens } from "./tokenStore.js";

const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const ACCOUNTS_ENDPOINT = "https://mybusinessaccountmanagement.googleapis.com/v1/accounts";
const LOCATIONS_BASE = "https://mybusinessbusinessinformation.googleapis.com/v1";

function ensureEnv() {
  const missing = [];
  if (!process.env.GOOGLE_CLIENT_ID) missing.push("GOOGLE_CLIENT_ID");
  if (!process.env.GOOGLE_CLIENT_SECRET) missing.push("GOOGLE_CLIENT_SECRET");
  if (missing.length) throw new Error(`Missing env vars: ${missing.join(", ")}`);
}

async function refreshAccessTokenIfNeeded(tokens) {
  // tokens: { access_token, refresh_token, expires_in, obtained_at }
  if (!tokens) return null;
  // Basic expiry check: if obtained_at + expires_in - 60s < now => refresh
  const obtained = tokens.obtained_at ? Date.parse(tokens.obtained_at) : 0;
  const expiresIn = Number(tokens.expires_in || 0);
  const willExpireAt = obtained + (expiresIn * 1000);
  const now = Date.now();
  // Refresh if already expired or will expire within 60s
  if (!tokens.access_token || !tokens.refresh_token || now + 60000 >= willExpireAt) {
    // attempt refresh
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
        console.error("Failed to refresh Google access token", { status: res.status, body: data });
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
      console.error("Error refreshing access token:", err && err.message ? err.message : err);
      return null;
    }
  }

  return tokens;
}

async function callGoogleApi(url, accessToken) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await res.json().catch(() => null);
  return { status: res.status, body: json };
}

export async function listAccounts() {
  const tokens = getTokens("google_business");
  if (!tokens) throw { code: "NO_TOKENS", message: "No Google OAuth tokens found" };

  const valid = await refreshAccessTokenIfNeeded(tokens);
  if (!valid) throw { code: "REFRESH_FAILED", message: "Failed to refresh access token" };

  const accounts = [];
  let pageToken = undefined;
  try {
    do {
      const url = pageToken ? `${ACCOUNTS_ENDPOINT}?pageToken=${encodeURIComponent(pageToken)}` : ACCOUNTS_ENDPOINT;
      const { status, body } = await callGoogleApi(url, valid.access_token);
      if (status === 401) throw { code: "TOKEN_INVALID", message: "Access token invalid or expired" };
      if (status >= 400) {
        throw { code: "API_ERROR", status, body };
      }
      const items = Array.isArray(body.accounts) ? body.accounts : [];
      for (const a of items) {
        accounts.push({ name: a.name, accountName: a.accountName || null, type: a.type || null });
      }
      pageToken = body.nextPageToken;
    } while (pageToken);
    return accounts;
  } catch (err) {
    throw err;
  }
}

export async function listLocations(accountId) {
  if (!accountId) throw { code: "INVALID_ACCOUNT", message: "accountId required" };
  const tokens = getTokens("google_business");
  if (!tokens) throw { code: "NO_TOKENS", message: "No Google OAuth tokens found" };

  const valid = await refreshAccessTokenIfNeeded(tokens);
  if (!valid) throw { code: "REFRESH_FAILED", message: "Failed to refresh access token" };

  const locations = [];
  let pageToken = undefined;
  try {
    do {
      const params = new URLSearchParams();
      params.set("pageSize", "50");
      params.set("readMask", "name,title,storefrontAddress");
      if (pageToken) params.set("pageToken", pageToken);
      const url = `${LOCATIONS_BASE}/accounts/${encodeURIComponent(accountId)}/locations?${params.toString()}`;
      const { status, body } = await callGoogleApi(url, valid.access_token);
      if (status === 401) throw { code: "TOKEN_INVALID", message: "Access token invalid or expired" };
      if (status >= 400) throw { code: "API_ERROR", status, body };

      const items = Array.isArray(body.locations) ? body.locations : [];
      for (const l of items) {
        locations.push({
          name: l.name,
          title: l.title || l.locationName || null,
          address: l.storefrontAddress || l.address || null,
          storefrontAddress: l.storefrontAddress || null,
          storeCode: l.storeCode || null,
          primaryCategory: l.primaryCategory || null,
        });
      }
      pageToken = body.nextPageToken;
    } while (pageToken);
    return locations;
  } catch (err) {
    throw err;
  }
}

export default { listAccounts, listLocations };
