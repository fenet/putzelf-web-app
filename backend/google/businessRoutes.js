import express from "express";
import { listAccounts, listLocations } from "./business.js";
import { getReviews } from "../reviews/providers/googleProvider.js";

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

// TEMPORARY TEST ROUTE ONLY: isolated from production review functionality.
router.get("/test/business-accounts/100252811760605819418/locations", async (_req, res) => {
  const accountId = "100252811760605819418";

  try {
    const locations = await listLocations(accountId);
    return res.json({
      accountId,
      accountName: "PutzelfLocationGroup",
      source: "temporary-test-endpoint",
      locations,
    });
  } catch (err) {
    console.error("Error listing temporary Google Business locations:", err && (err.message || err));
    if (err?.code === "NO_TOKENS" || err?.code === "REFRESH_FAILED" || err?.code === "TOKEN_INVALID") {
      return res.status(401).json({ error: "Google OAuth required or token refresh failed" });
    }
    if (err?.code === "INVALID_ACCOUNT") {
      return res.status(400).json({ error: "Invalid accountId" });
    }
    if (err?.code === "API_ERROR") {
      return res.status(err.status || 502).json({ error: "Google API error", details: err.body });
    }
    return res.status(500).json({ error: "Failed to list temporary test locations" });
  }
});

router.get("/locations/:locationId/reviews", async (req, res) => {
  const { locationId } = req.params;
  const accountId = "100252811760605819418";
  const locationResourceName = `accounts/${accountId}/locations/${locationId}`;

  try {
    const result = await getReviews({
      location: locationResourceName,
      limit: 10,
      page: 1,
    });

    return res.json({
      accountId,
      locationId,
      locationResourceName,
      source: "google-business-profile",
      ...result,
    });
  } catch (err) {
    console.error("Error listing Google reviews for location:", err && (err.message || err));
    if (err?.code === "NO_TOKENS" || err?.code === "REFRESH_FAILED" || err?.code === "TOKEN_INVALID") {
      return res.status(401).json({ error: "Google OAuth required or token refresh failed" });
    }
    if (err?.code === "MISSING_LOCATION") {
      return res.status(400).json({ error: "location resource name is required" });
    }
    if (err?.code === "QUOTA") {
      return res.status(502).json({ error: "Google Business Profile API not available (quota/pending)", details: err.details });
    }
    if (err?.code === "API_ERROR") {
      return res.status(err.status || 502).json({ error: "Google API error", details: err.body });
    }
    return res.status(500).json({ error: "Failed to fetch Google reviews" });
  }
});

// TEMPORARY TEST ROUTE ONLY: fetch reviews for the known Wien location via the existing Google OAuth/token flow.
router.get("/test/locations/:locationId/reviews", async (req, res) => {
  const { locationId } = req.params;
  const accountId = "100252811760605819418";
  const locationResourceName = `accounts/${accountId}/locations/${locationId}`;

  try {
    const result = await getReviews({
      location: locationResourceName,
      limit: 10,
      page: 1,
    });

    return res.json({
      accountId,
      locationId,
      locationResourceName,
      source: "temporary-test-endpoint",
      ...result,
    });
  } catch (err) {
    console.error("Error listing temporary Google reviews:", err && (err.message || err));
    if (err?.code === "NO_TOKENS" || err?.code === "REFRESH_FAILED" || err?.code === "TOKEN_INVALID") {
      return res.status(401).json({ error: "Google OAuth required or token refresh failed" });
    }
    if (err?.code === "MISSING_LOCATION") {
      return res.status(400).json({ error: "location resource name is required" });
    }
    if (err?.code === "QUOTA") {
      return res.status(502).json({ error: "Google Business Profile API not available (quota/pending)", details: err.details });
    }
    if (err?.code === "API_ERROR") {
      return res.status(err.status || 502).json({ error: "Google API error", details: err.body });
    }
    return res.status(500).json({ error: "Failed to fetch temporary test reviews" });
  }
});

export default router;
