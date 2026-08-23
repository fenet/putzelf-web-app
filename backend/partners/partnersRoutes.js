import express from "express";
import { sendQuoteRequestConfirmation } from "../utils/mailer.js";

const router = express.Router();

// POST /api/partners/inquiry
router.post("/inquiry", async (req, res) => {
  try {
    const { name, company, address, email, phone, message, location } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required" });
    }

    const normalizedLocation = String(location || "vienna").trim().toLowerCase();
    if (!['vienna', 'graz'].includes(normalizedLocation)) {
      return res.status(400).json({ error: "Invalid location" });
    }

    const booking = {
      name,
      company,
      address,
      email,
      phone,
      message,
      location: normalizedLocation,
    };

    const officeEmail = normalizedLocation === "graz" ? "office.stmk@putzelf.com" : "office@putzelf.com";

    // Route the office inquiry to the correct location only.
    await sendQuoteRequestConfirmation(officeEmail, booking);

    // Send confirmation to the sender as the existing functionality.
    try {
      await sendQuoteRequestConfirmation(email, booking);
    } catch (err) {
      console.warn("Failed to send confirmation to sender:", err && err.message);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Partners inquiry error:", err && (err.stack || err.message || err));
    res.status(500).json({ error: "Failed to process inquiry" });
  }
});

export default router;
