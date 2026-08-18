import express from "express";
import { sendQuoteRequestConfirmation } from "../utils/mailer.js";

const router = express.Router();

// POST /api/partners/inquiry
router.post("/inquiry", async (req, res) => {
  try {
    const { name, company, address, email, phone, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required" });
    }

    const booking = {
      name,
      company,
      address,
      email,
      phone,
      message,
    };

    // Reuse quote request email template to notify office and send confirmation to sender
    // Send to office
    await sendQuoteRequestConfirmation("office@putzelf.com", booking);
    // Send confirmation to the sender
    try {
      await sendQuoteRequestConfirmation(email, booking);
    } catch (err) {
      // non-fatal: still return success to frontend
      console.warn("Failed to send confirmation to sender:", err && err.message);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Partners inquiry error:", err && (err.stack || err.message || err));
    res.status(500).json({ error: "Failed to process inquiry" });
  }
});

export default router;
