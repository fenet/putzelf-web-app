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

const MARKETING_API_BASE_URL = (process.env.MARKETING_API_BASE_URL || "").trim().replace(/\/$/, "");
const INTEGRATION_KEY = (process.env.INTEGRATION_KEY || "").trim();

if (!JWT_SECRET) {
  console.warn("JWT_SECRET is missing in environment variables.");
}

app.use(cors());
app.use(bodyParser.json());

function assertIntegrationConfigured() {
  if (!MARKETING_API_BASE_URL || !INTEGRATION_KEY) {
    const missing = [
      !MARKETING_API_BASE_URL ? "MARKETING_API_BASE_URL" : null,
      !INTEGRATION_KEY ? "INTEGRATION_KEY" : null,
    ].filter(Boolean);
    const msg = `Integration not configured. Missing: ${missing.join(", ")}`;
    const err = new Error(msg);
    err.code = "INTEGRATION_NOT_CONFIGURED";
    throw err;
  }

  // Common local-dev pitfall: pointing MARKETING_API_BASE_URL back to this backend.
  // That causes recursive calls and opaque 404/HTML responses.
  try {
    const u = new URL(MARKETING_API_BASE_URL);
    const host = (u.hostname || "").toLowerCase();
    const port = String(u.port || (u.protocol === "https:" ? "443" : "80"));
    const serverPort = String(PORT);
    const loopbackHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);
    if (loopbackHosts.has(host) && port === serverPort) {
      const msg =
        `Integration misconfigured: MARKETING_API_BASE_URL points to the backend itself (${MARKETING_API_BASE_URL}). ` +
        `Set MARKETING_API_BASE_URL to the marketing app base URL (e.g. http://127.0.0.1:5000).`;
      const err = new Error(msg);
      err.code = "INTEGRATION_MISCONFIGURED";
      throw err;
    }
  } catch (e) {
    if (e?.code === "INTEGRATION_MISCONFIGURED") throw e;
    // Ignore URL parsing errors here; downstream fetch will fail with a clearer message.
  }
}

async function marketingFetch(path, options = {}) {
  assertIntegrationConfigured();
  const url = path.startsWith("http") ? path : `${MARKETING_API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const headers = new Headers(options.headers || {});
  headers.set("X-INTEGRATION-KEY", INTEGRATION_KEY);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(url, { ...options, headers });
}

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

app.get("/api/availability/slots", async (req, res) => {
  try {
    const employeeCode = String(req.query.worker || req.query.employee_code || "").trim();
    const day = String(req.query.day || req.query.date || "").trim();
    const durationHours = String(req.query.duration_hours || req.query.duration || "").trim();
    const address = String(req.query.address || req.query.location || "").trim();

    if (!employeeCode || !day || !durationHours) {
      return res.status(400).json({ error: "worker, day and duration_hours are required" });
    }

    const params = new URLSearchParams({
      employee_code: employeeCode,
      day,
      duration_hours: durationHours,
    });
    if (address) params.set("address", address);

    const upstream = await marketingFetch(`/api/integrations/availability/slots?${params.toString()}`);
    const data = await upstream.json().catch(() => null);
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data?.error || "Failed to fetch slots" });
    }
    return res.json(data);
  } catch (err) {
    console.error("Slots proxy error:", err);
    if (err?.code === "INTEGRATION_NOT_CONFIGURED") {
      return res.status(503).json({ error: err.message });
    }
    return res.status(500).json({ error: err?.message || "Failed to fetch slots" });
  }
});

app.get("/api/availability/month", async (req, res) => {
  try {
    const employeeCode = String(req.query.worker || req.query.employee_code || "").trim();
    const month = String(req.query.month || "").trim();
    const durationHours = String(req.query.duration_hours || req.query.duration || "").trim();
    const address = String(req.query.address || req.query.location || "").trim();

    if (!employeeCode || !month || !durationHours) {
      return res.status(400).json({ error: "worker, month and duration_hours are required" });
    }

    const params = new URLSearchParams({
      employee_code: employeeCode,
      month,
      duration_hours: durationHours,
    });
    if (address) params.set("address", address);

    const upstream = await marketingFetch(`/api/integrations/availability/month?${params.toString()}`);
    const data = await upstream.json().catch(() => null);
    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data?.error || "Failed to fetch availability" });
    }
    return res.json(data);
  } catch (err) {
    console.error("Month availability proxy error:", err);
    if (err?.code === "INTEGRATION_NOT_CONFIGURED") {
      return res.status(503).json({ error: err.message });
    }
    return res.status(500).json({ error: err?.message || "Failed to fetch availability" });
  }
});

app.get("/api/workers", async (_req, res) => {
  try {
    const upstream = await marketingFetch("/api/integrations/employees");
    const data = await upstream.clone().json().catch(() => null);
    if (!upstream.ok) {
      const text = data ? null : await upstream.text().catch(() => null);
      const fallback = text && text.trim().length > 0
        ? `Failed to fetch workers (upstream ${upstream.status}): ${text.trim().slice(0, 160)}`
        : "Failed to fetch workers";
      return res.status(upstream.status).json({ error: data?.error || fallback });
    }
    const rawEmployees = Array.isArray(data)
      ? data
      : Array.isArray(data?.employees)
        ? data.employees
        : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.data?.employees)
            ? data.data.employees
            : Array.isArray(data?.results)
              ? data.results
              : [];

    const normalizedEmployees = rawEmployees
      .map((emp) => {
        const code = String(
          emp?.code ||
            emp?.employee_code ||
            emp?.employeeCode ||
            emp?.id ||
            emp?.uuid ||
            ""
        ).trim();
        if (!code) return null;
        const name = String(
          emp?.name ||
            emp?.full_name ||
            emp?.fullName ||
            emp?.display_name ||
            emp?.displayName ||
            emp?.email ||
            code
        ).trim();
        const status = emp?.status ?? emp?.state ?? null;
        const activeRaw = emp?.active ?? emp?.is_active ?? emp?.isActive ?? status;
        const active = typeof activeRaw === "string"
          ? ["active", "enabled", "true"].includes(activeRaw.toLowerCase())
          : Boolean(activeRaw ?? true);
        return { code, name, active };
      })
      .filter(Boolean);

    return res.json({ employees: normalizedEmployees });
  } catch (err) {
    console.error("Workers proxy error:", err);
    if (err?.code === "INTEGRATION_NOT_CONFIGURED" || err?.code === "INTEGRATION_MISCONFIGURED") {
      return res.status(503).json({ error: err.message });
    }
    return res.status(500).json({ error: err?.message || "Failed to fetch workers" });
  }
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

app.post("/api/bookings", attachUserIfPresent, async (req, res) => {
  try {
    const { location, date, time, duration, typeOfCleaning, renegotiate, preferredWorker } = req.body;

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
        preferredWorkerCode: preferredWorker ? String(preferredWorker) : null,
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

    // Final stamp: create a shift in marketing schedule (source of truth).
    // If a worker is selected, confirmation only succeeds if the shift is created.
    const employeeCode = existing.preferredWorkerCode;
    let adminShiftId = null;
    if (employeeCode) {
      let shiftRes;
      try {
        shiftRes = await marketingFetch("/api/integrations/shifts/from-booking", {
          method: "POST",
          body: JSON.stringify({
            booking_id: existing.id,
            employee_code: employeeCode,
            day: existing.date,
            start_time: existing.time,
            duration_hours: Number(existing.duration),
            address: address || existing.location,
            instructions: `Website booking #${existing.id}${name ? ` — ${name}` : ""}`,
          }),
        });
      } catch (integrationErr) {
        console.warn(
          "Marketing shift creation failed:",
          integrationErr?.message || integrationErr
        );
        return res.status(503).json({
          error: "Scheduling system unavailable. Please try again shortly.",
        });
      }

      const shiftData = await shiftRes.json().catch(() => null);
      if (!shiftRes.ok) {
        const message =
          shiftData?.error ||
          (typeof shiftData === "string" ? shiftData : null) ||
          `Slot no longer available (upstream ${shiftRes.status})`;
        return res.status(shiftRes.status).json({ error: message });
      }
      if (shiftData?.shiftId) {
        adminShiftId = Number(shiftData.shiftId);
      }
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        name,
        email,
        address,
        phone,
        gdprConsent: true,
        price,
        userId: req.user?.id ?? existing.userId,
        confirmedAt: new Date(),
        adminShiftId,
      },
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