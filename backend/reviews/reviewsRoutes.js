import express from "express";
import ReviewService from "./reviewService.js";

const router = express.Router();

// GET /api/google-reviews
router.get("/google-reviews", async (req, res) => {
  try {
    const { location, rating, sort, limit, page } = req.query;
    const result = await ReviewService.getReviews({ location, rating, sort, limit, page });
    res.json(result);
  } catch (err) {
    console.error("Error in /google-reviews:", err && (err.message || err));
    if (err?.code === "NO_TOKENS" || err?.code === "REFRESH_FAILED" || err?.code === "TOKEN_INVALID") {
      return res.status(401).json({ error: "Google OAuth required or token refresh failed" });
    }
    if (err?.code === "QUOTA") {
      return res.status(502).json({ error: "Google Business Profile API not available (quota/pending)", details: err.details });
    }
    if (err?.code === "MISSING_LOCATION") {
      return res.status(400).json({ error: "location parameter is required for Google provider" });
    }
    return res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

export default router;
