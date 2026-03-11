import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendBookingConfirmation, sendQuoteRequestConfirmation } from "./utils/mailer.js";
import { sendMetaEvent, sendMetaLeadEvent } from "./utils/metaConversions.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_INVITE_CODE = process.env.ADMIN_INVITE_CODE;

if (!JWT_SECRET) {
  console.warn("JWT_SECRET is missing in environment variables.");
}

app.use(cors());
app.use(bodyParser.json());

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

function getHourlyRate(typeOfCleaning) {
  return 30;
}

app.get("/", (req, res) => res.send("PutzELF backend running"));

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

app.post("/api/bookings", attachUserIfPresent, async (req, res) => {
  try {
    const { location, date, time, duration, typeOfCleaning, renegotiate } = req.body;

    if (!date || !time || !duration || !typeOfCleaning) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hourlyRate = getHourlyRate(typeOfCleaning);
    const price = Number(duration) * hourlyRate;

    const booking = await prisma.booking.create({
      data: {
        location,
        date,
        time,
        duration: Number(duration),
        typeOfCleaning,
        renegotiate: !!renegotiate,
        price,
        userId: req.user?.id ?? null,
      },
    });

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

    const booking = await prisma.booking.update({
      where: { id },
      data: { name, email, address, phone, gdprConsent: true, price, userId: req.user?.id ?? existing.userId },
    });

    const isQuoteRequest =
      (existing.typeOfCleaning || "").toLowerCase() === "quote request" ||
      (existing.typeOfCleaning || "").toLowerCase() === "angebot anfragen";

    if (isQuoteRequest) {
      await sendQuoteRequestConfirmation([booking.email, "office@putzelf.com"], booking);
    } else {
      await sendBookingConfirmation([booking.email, "office@putzelf.com"], booking);
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