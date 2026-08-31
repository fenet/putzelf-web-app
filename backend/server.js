import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendBookingConfirmation, sendContactRequest, sendQuoteRequestConfirmation } from "./utils/mailer.js";
import { MIN_HOURS, WINDOW_PRICE_NET, INTENSIVE_HOURLY_NET, TAX_RATE } from "./config.js";
import { sendMetaEvent, sendMetaLeadEvent } from "./utils/metaConversions.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_INVITE_CODE = process.env.ADMIN_INVITE_CODE;

const INTEGRATION_KEY = (process.env.INTEGRATION_KEY || "").trim();

if (!JWT_SECRET) {
  console.warn("JWT_SECRET is missing in environment variables.");
}

app.use(cors());
app.use(bodyParser.json());

import googleRouter from "./google/oauth.js";
app.use("/api/google", googleRouter);
import businessRouter from "./google/businessRoutes.js";
app.use("/api/google", businessRouter);
import reviewsRouter from "./reviews/reviewsRoutes.js";
app.use("/api", reviewsRouter);

import partnersRouter from "./partners/partnersRoutes.js";
app.use("/api/partners", partnersRouter);

const sanitizeUser = (user) => ({
  id: user.id,
  email: user.email,
  role: user.role,
});

const signToken = (user) =>
  jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: "12h" });

async function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
}

const attachUserIfPresent = async (req, _res, next) => {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    try {
      const payload = jwt.verify(header.slice(7), JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, email: true, role: true },
      });
      if (user) req.user = user;
    } catch (err) {
      console.warn("Optional auth failed:", err.message);
    }
  }
  next();
};

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

function getHourlyRate(typeOfCleaning, subcategories) {
  // simple mapping: base net hourly rate is 30. If intensive is requested, use intensive net rate.
  const subs = Array.isArray(subcategories) ? subcategories : [];
  if (subs.includes("intensive")) return INTENSIVE_HOURLY_NET;
  return 30;
}

app.get("/", (req, res) => res.send("PutzELF backend running"));

app.get("/api/availability/slots", async (req, res) => {
  try {
    const day = String(req.query.day || req.query.date || "").trim();
    const durationHoursRaw = String(req.query.duration_hours || req.query.duration || "").trim();

    if (!day || !durationHoursRaw) {
      return res.status(400).json({ error: "day and duration_hours are required" });
    }

    const durationHours = Math.max(MIN_HOURS, Number(durationHoursRaw) || MIN_HOURS);

    // Generate hourly slots 06:00 - 22:00 inclusive, but ensure slot start + duration <= 22:00
    const closingHour = 24;
    const slotLength = Math.max(1, Math.ceil(durationHours));
    const baseSlots = [];
    for (let h = 6; h <= 24; h += 1) {
      baseSlots.push(String(h).padStart(2, "0") + ":00");
    }

    const slots = baseSlots.filter((s) => {
      const startHour = Number(s.slice(0, 2));
      return startHour + slotLength <= closingHour;
    });

    return res.json({ slots });
  } catch (err) {
    console.error("Slots proxy error:", err);
    return res.status(500).json({ error: err?.message || "Failed to compute slots" });
  }
});

app.get("/api/availability/month", async (req, res) => {
  try {
    const month = String(req.query.month || "").trim();
    const durationHoursRaw = String(req.query.duration_hours || req.query.duration || "").trim();

    if (!month || !durationHoursRaw) {
      return res.status(400).json({ error: "month and duration_hours are required" });
    }

    // Parse YYYY-MM
    const parts = month.split("-");
    if (parts.length !== 2) {
      return res.status(400).json({ error: "month must be in YYYY-MM format" });
    }
    const year = Number(parts[0]);
    const mon = Number(parts[1]);
    if (!year || !mon || mon < 1 || mon > 12) {
      return res.status(400).json({ error: "Invalid month" });
    }

    const durationHours = Math.max(MIN_HOURS, Number(durationHoursRaw) || MIN_HOURS);

    const daysInMonth = new Date(year, mon, 0).getDate();
    const availableDays = [];
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for (let d = 1; d <= daysInMonth; d += 1) {
      const dt = new Date(year, mon - 1, d);
      // Include weekends as valid days; skip past dates only
      // skip past dates
      if (dt < startOfToday) continue;
      const yyyy = dt.getFullYear();
      const mm = String(dt.getMonth() + 1).padStart(2, "0");
      const dd = String(dt.getDate()).padStart(2, "0");
      availableDays.push(`${yyyy}-${mm}-${dd}`);
    }

    return res.json({ availableDays });
  } catch (err) {
    console.error("Month availability proxy error:", err);
    return res.status(500).json({ error: err?.message || "Failed to compute availability" });
  }
});

app.get("/api/workers", async (_req, res) => {
  // Workers endpoint stubbed: return empty list to remove dependency on marketing integration
  return res.json({ employees: [] });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, inviteCode } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }
    const role =
      inviteCode && ADMIN_INVITE_CODE && inviteCode === ADMIN_INVITE_CODE
        ? "ADMIN"
        : "CUSTOMER";
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email: email.toLowerCase(), passwordHash, role },
    });
    const token = signToken(user);
    res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = signToken(user);
    res.json({ token, user: sanitizeUser(user) });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/api/auth/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.post("/api/auth/logout", (_req, res) => {
  res.json({ message: "Logged out" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, location, subject, message } = req.body || {};
    const normalizedLocation = String(location || "vienna").trim().toLowerCase();

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (!['vienna', 'graz'].includes(normalizedLocation)) {
      return res.status(400).json({ error: "Invalid location" });
    }

    const contactRequest = {
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      location: normalizedLocation,
      subject: String(subject).trim(),
      message: String(message).trim(),
    };

    const recipient = normalizedLocation === "graz" ? "office.stmk@putzelf.com" : "office@putzelf.com";
    await sendContactRequest(contactRequest, recipient);

    return res.status(201).json({ ok: true, recipient });
  } catch (err) {
    console.error("Contact form error:", err && (err.stack || err.message || err));
    return res.status(500).json({ error: "Failed to send contact request" });
  }
});

app.post("/api/bookings", attachUserIfPresent, async (req, res) => {
  try {
    const {
      location,
      date,
      time,
      duration,
      typeOfCleaning,
      renegotiate,
      preferredWorker,
      name,
      email,
      address,
      phone,
      notes,
      gdprConsent,
    } = req.body;

    if (!date || !time || !duration || !typeOfCleaning) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const subcategories = Array.isArray(req.body.subcategories) ? req.body.subcategories : [];
    const windowsCount = Number(req.body.windows || 0) || 0;
    const hourlyRate = getHourlyRate(typeOfCleaning, subcategories);

    const windowsNet = windowsCount * WINDOW_PRICE_NET;
    const priceNet = Number(duration) * hourlyRate + windowsNet;
    const taxAmount = priceNet * TAX_RATE;
    const price = priceNet + taxAmount; // store gross price

    // Build booking data and attach user relation only when present
    const bookingData = {
      location,
      date,
      time,
      duration: Number(duration),
      typeOfCleaning,
      preferredWorkerCode: preferredWorker ? String(preferredWorker) : null,
      renegotiate: !!renegotiate,
      price,
      // windows and subcategories are not persisted in DB currently; include in email payload below
      name: name ? String(name) : null,
      email: email ? String(email) : null,
      address: address ? String(address) : null,
      phone: phone ? String(phone) : null,
      gdprConsent: !!gdprConsent,
      confirmedAt: gdprConsent === true ? new Date() : null,
    };

    if (req.user && req.user.id) {
      bookingData.user = { connect: { id: req.user.id } };
    }

    const booking = await prisma.booking.create({ data: bookingData });

    // If GDPR consent present and true, treat this as final confirmation and send emails
    try {
      const isQuoteRequest =
        (typeOfCleaning || "").toLowerCase() === "quote request" ||
        (typeOfCleaning || "").toLowerCase() === "angebot anfragen";

    if (gdprConsent === true) {
        const emailBooking = {
          ...booking,
          notes: typeof notes === "string" ? notes : "",
          windows: windowsCount,
          subcategories,
          // include structured contact/address fields from the original request so mailers can use them
          firstName: req.body.firstName || booking.firstName || null,
          lastName: req.body.lastName || booking.lastName || null,
          streetName: req.body.streetName || null,
          houseNumber: req.body.houseNumber || null,
          doorNumber: req.body.doorNumber || null,
          buildingNumber: req.body.buildingNumber || null,
          postalCode: req.body.postalCode || null,
          city: req.body.city || null,
        };
        // determine office recipient based on booking.location (server-side source of truth)
        const officeEmailForOffice = (booking.location || "vienna").toLowerCase() === "graz" ? "office.stmk@putzelf.com" : "office@putzelf.com";
        // Booking-specific recipient (new dedicated booking inboxes)
        const bookingRecipient = (booking.location || "vienna").toLowerCase() === "graz" ? "graz.booking@putzelf.com" : "wien.booking@putzelf.com";

        if (isQuoteRequest) {
          // send only to office recipient (single recipient requirement)
          try {
            await sendQuoteRequestConfirmation(officeEmailForOffice, emailBooking);
          } catch (err) {
            console.warn("Failed to send quote request email to office:", err && (err.message || err));
          }
        } else {
          // First send to the dedicated booking inbox
          try {
            await sendBookingConfirmation(bookingRecipient, emailBooking);
          } catch (err) {
            console.warn("Failed to send booking email to booking inbox:", err && (err.message || err));
          }

          // Then send a confirmation to the customer if email present
          if (emailBooking.email) {
            try {
              await sendBookingConfirmation(emailBooking.email, emailBooking);
            } catch (err) {
              console.warn("Failed to send booking confirmation to customer:", err && (err.message || err));
            }
          } else {
            console.warn("No customer email provided; skipping customer confirmation");
          }
        }
      }
    } catch (mailErr) {
      console.warn("Failed to send booking confirmation email:", mailErr && (mailErr.message || mailErr));
      // Do not fail the request for email errors
    }

    return res.status(201).json(booking);
  } catch (err) {
    console.error("Create booking error:", err && (err.stack || err.message || err));
    return res.status(500).json({ error: err?.message || "Failed to create booking" });
  }
});

app.get("/api/bookings", authenticate, requireRole("ADMIN"), async (_req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

app.get("/api/bookings/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

app.get("/api/bookings/search", authenticate, requireRole("ADMIN"), async (req, res) => {
  try {
    const { location, date, type } = req.query;
    const where = {};

    if (location) where.location = location;
    if (date) where.date = date;
    if (type) where.typeOfCleaning = type;

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search bookings" });
  }
});

app.put("/api/bookings/:id/confirm", attachUserIfPresent, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const {
      name,
      email,
      address,
      phone,
      notes,
      gdprConsent,
      metaEventId,
      metaEventSource,
    } = req.body;

    if (!name || !email || !address || !phone || gdprConsent !== true) {
      return res
        .status(400)
        .json({ error: "All customer fields + GDPR consent are required" });
    }

    const existing = await prisma.booking.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Booking not found" });

    const hourlyRate = getHourlyRate(existing.typeOfCleaning);
    const price = Number(existing.duration) * hourlyRate;

    // No external scheduling integration: do not create external shifts.
    // Proceed with confirming the booking locally regardless of preferredWorker.
    const adminShiftId = null;

    const updateData = {
      name,
      email,
      address,
      phone,
      gdprConsent: true,
      price,
      confirmedAt: new Date(),
      adminShiftId,
    };
    if (req.user && req.user.id) {
      updateData.user = { connect: { id: req.user.id } };
    }

    const booking = await prisma.booking.update({ where: { id }, data: updateData });

    const emailBooking = {
      ...booking,
      notes: typeof notes === "string" ? notes : "",
      // include structured contact/address fields from the confirmation request
      firstName: req.body.firstName || booking.firstName || null,
      lastName: req.body.lastName || booking.lastName || null,
      streetName: req.body.streetName || null,
      houseNumber: req.body.houseNumber || null,
      doorNumber: req.body.doorNumber || null,
      buildingNumber: req.body.buildingNumber || null,
      postalCode: req.body.postalCode || null,
      city: req.body.city || null,
    };

    const isQuoteRequest =
      (existing.typeOfCleaning || "").toLowerCase() === "quote request" ||
      (existing.typeOfCleaning || "").toLowerCase() === "angebot anfragen";

    // determine office recipient based on booking.location (server-side)
    const officeEmailForOffice = (booking.location || "vienna").toLowerCase() === "graz" ? "office.stmk@putzelf.com" : "office@putzelf.com";
    const bookingRecipient = (booking.location || "vienna").toLowerCase() === "graz" ? "graz.booking@putzelf.com" : "wien.booking@putzelf.com";
    if (isQuoteRequest) {
      try {
        await sendQuoteRequestConfirmation(officeEmailForOffice, emailBooking);
      } catch (err) {
        console.warn("Failed to send quote request email to office:", err && (err.message || err));
      }
    } else {
      try {
        await sendBookingConfirmation(bookingRecipient, emailBooking);
      } catch (err) {
        console.warn("Failed to send booking email to booking inbox:", err && (err.message || err));
      }

      if (emailBooking.email) {
        try {
          await sendBookingConfirmation(emailBooking.email, emailBooking);
        } catch (err) {
          console.warn("Failed to send booking confirmation to customer:", err && (err.message || err));
        }
      } else {
        console.warn("No customer email provided; skipping customer confirmation");
      }
    }

    try {
      await sendMetaLeadEvent({
        booking,
        eventId: metaEventId,
        eventSourceUrl: metaEventSource,
        clientIp: req.headers["x-forwarded-for"] || req.socket?.remoteAddress,
        userAgent: req.headers["user-agent"],
      });
    } catch (metaErr) {
      console.warn(
        "Meta Conversions dispatch failed:",
        metaErr && (metaErr.message || metaErr)
      );
    }

    res.json({ message: "Booking confirmed and email sent", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm booking" });
  }
});

app.post("/api/integrations/admin/shift-updated", async (req, res) => {
  const header = String(req.headers["x-integration-key"] || "").trim();
  if (!INTEGRATION_KEY || header !== INTEGRATION_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { bookingId, date, time, durationHours, preferredWorkerCode, adminShiftId } = req.body || {};
    const id = Number(bookingId);
    if (!id || !date || !time) {
      return res.status(400).json({ error: "bookingId, date and time are required" });
    }
    const duration = durationHours ? Math.round(Number(durationHours)) : undefined;
    const data = {
      date: String(date),
      time: String(time),
      preferredWorkerCode: preferredWorkerCode ? String(preferredWorkerCode) : undefined,
      adminShiftId: adminShiftId ? Number(adminShiftId) : undefined,
      duration: duration && duration > 0 ? duration : undefined,
    };
    await prisma.booking.update({ where: { id }, data });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Shift update webhook error:", err);
    return res.status(500).json({ error: "Failed to apply shift update" });
  }
});

app.post("/api/meta/event", async (req, res) => {
  try {
    const { eventName, eventId, eventSourceUrl, customData } = req.body || {};
    if (!eventName) {
      return res.status(400).json({ error: "eventName is required" });
    }

    await sendMetaEvent({
      eventName,
      eventId,
      eventSourceUrl,
      customData,
      clientIp: req.headers["x-forwarded-for"] || req.socket?.remoteAddress,
      userAgent: req.headers["user-agent"],
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("Meta event proxy error:", err);
    res.status(500).json({ error: "Failed to dispatch Meta event" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});