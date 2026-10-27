import express from "express";
import { sendQuoteRequestConfirmation } from "../utils/mailer.js";
import { sendNativeFormResponse } from "../utils/nativeFormResponse.js";

const router = express.Router();

// POST /api/partners/inquiry
router.post("/inquiry", async (req, res) => {
  try {
    const body = req.body || {};
    const name = String(body.name || "").trim();
    const company = String(body.company || "").trim();
    const address = String(body.address || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();
    const location = body.location;

    if (!name || !email || !message) {
      if (sendNativeFormResponse(req, res, { form: "partners", outcome: "invalid" })) return;
      return res.status(400).json({ error: "name, email and message are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || (phone && !/^\d+$/.test(phone))) {
      if (sendNativeFormResponse(req, res, { form: "partners", outcome: "invalid" })) return;
      return res.status(400).json({ error: "Invalid email address or phone number" });
    }

    const normalizedLocation = String(location || "vienna").trim().toLowerCase();
    if (!['vienna', 'graz'].includes(normalizedLocation)) {
      if (sendNativeFormResponse(req, res, { form: "partners", outcome: "invalid" })) return;
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

    if (sendNativeFormResponse(req, res, { form: "partners", outcome: "success" })) return;
    res.json({ ok: true });
  } catch (err) {
    console.error("Partners inquiry error:", err && (err.stack || err.message || err));
    if (sendNativeFormResponse(req, res, { form: "partners", outcome: "error" })) return;
    res.status(500).json({ error: "Failed to process inquiry" });
  }
});

export default router;
