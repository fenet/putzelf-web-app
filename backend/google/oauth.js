import express from "express";
import qs from "querystring";
import { saveTokens } from "./tokenStore.js";

const router = express.Router();

const GOOGLE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/business.manage";

function ensureEnv() {
  const missing = [];
  if (!process.env.GOOGLE_CLIENT_ID) missing.push("GOOGLE_CLIENT_ID");
  if (!process.env.GOOGLE_CLIENT_SECRET) missing.push("GOOGLE_CLIENT_SECRET");
  if (!process.env.GOOGLE_REDIRECT_URI) missing.push("GOOGLE_REDIRECT_URI");
  if (missing.length) {
    throw new Error(`Missing env vars: ${missing.join(", ")}`);
  }
}

// Start OAuth flow. Redirects user to Google consent page.
router.get("/oauth/start", (req, res) => {
  try {
    ensureEnv();
    const state = req.query.state ? String(req.query.state) : "";
    const params = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      response_type: "code",
      access_type: "offline",
      include_granted_scopes: "true",
      prompt: "consent",
      scope: SCOPE,
    };
    if (state) params.state = state;
    const url = `${GOOGLE_AUTH_ENDPOINT}?${qs.stringify(params)}`;
    return res.redirect(url);
  } catch (err) {
    console.error("Failed to start Google OAuth:", err.message);
    return res.status(500).json({ error: "Failed to start Google OAuth" });
  }
});

// Callback endpoint for Google OAuth
router.get("/oauth/callback", async (req, res) => {
  try {
    ensureEnv();
    const { error, code, state } = req.query;
    if (error) {
      console.error("Google OAuth error from provider:", String(error));
      return res.status(400).send("Google OAuth error: " + String(error));
    }
    if (!code) {
      console.error("Google OAuth callback missing code");
      return res.status(400).send("Missing authorization code");
    }

    // Exchange code for tokens
    const body = {
      code: String(code),
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    };

    const tokenRes = await fetch(GOOGLE_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: qs.stringify(body),
    });

    const tokenJson = await tokenRes.json().catch(() => null);
    if (!tokenRes.ok) {
      console.error("Failed to exchange code for tokens. Status:", tokenRes.status, "Body:", tokenJson);
      return res.status(502).send("Failed to exchange code for tokens");
    }

    // tokenJson contains access_token, expires_in, refresh_token (if granted), scope, token_type
    // Save tokens in development token store under a key; here we can use a simple key 'google_business'
    const safeToStore = {
      scope: tokenJson.scope,
      token_type: tokenJson.token_type,
      expires_in: tokenJson.expires_in,
      // Do NOT log or echo access_token/refresh_token
    };

    // Save full tokens in dev store (tokens themselves are NOT returned to frontend)
    saveTokens("google_business", {
      access_token: tokenJson.access_token,
      refresh_token: tokenJson.refresh_token || null,
      scope: tokenJson.scope,
      token_type: tokenJson.token_type,
      expires_in: tokenJson.expires_in,
      obtained_at: new Date().toISOString(),
    });

    console.info("Google OAuth succeeded for scope:", safeToStore.scope);

    // Redirect user back to frontend profile page (do not include tokens)
    const frontend = process.env.FRONTEND_BASE_URL || "http://localhost:5173";
    const redirectUrl = `${frontend.replace(/\/$/, "")}/profile?google_oauth=success`;
    return res.redirect(redirectUrl);
  } catch (err) {
    console.error("Google OAuth callback error:", err && err.message ? err.message : err);
    return res.status(500).send("Internal server error processing OAuth callback");
  }
});

export default router;
