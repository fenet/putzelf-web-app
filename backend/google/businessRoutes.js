import express from "express";
import { listAccounts, listLocations } from "./business.js";

const router = express.Router();

router.get("/business-accounts", async (req, res) => {
  try {
    const accounts = await listAccounts();
    return res.json({ accounts });
  } catch (err) {
    console.error("Error listing Google Business accounts:", err && (err.message || err));
    if (err?.code === "NO_TOKENS" || err?.code === "REFRESH_FAILED" || err?.code === "TOKEN_INVALID") {
      return res.status(401).json({ error: "Google OAuth required or token refresh failed" });
    }
    if (err?.code === "API_ERROR") {
      return res.status(err.status || 502).json({ error: "Google API error", details: err.body });
    }
    return res.status(500).json({ error: "Failed to list Google Business accounts" });
  }
});

router.get("/business-accounts/:accountId/locations", async (req, res) => {
  try {
    const { accountId } = req.params;
    const locations = await listLocations(accountId);
    return res.json({ locations });
  } catch (err) {
    console.error("Error listing locations for Google Business account:", err && (err.message || err));
    if (err?.code === "NO_TOKENS" || err?.code === "REFRESH_FAILED" || err?.code === "TOKEN_INVALID") {
      return res.status(401).json({ error: "Google OAuth required or token refresh failed" });
    }
    if (err?.code === "INVALID_ACCOUNT") {
      return res.status(400).json({ error: "Invalid accountId" });
    }
    if (err?.code === "API_ERROR") {
      return res.status(err.status || 502).json({ error: "Google API error", details: err.body });
    }
    return res.status(500).json({ error: "Failed to list locations" });
  }
});

export default router;
