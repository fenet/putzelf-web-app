import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { sendBookingConfirmation } from "./utils/mailer.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Helper: determine hourly rate based on cleaning type
function getHourlyRate(typeOfCleaning) {
  // Single base rate across services
  return 30;
}

// Health
app.get("/", (req, res) => res.send("PutzELF backend running"));

// Create booking (initial booking request)
app.post("/api/bookings", async (req, res) => {
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
      },
    });

    return res.status(201).json(booking);
  } catch (err) {
    console.error('Create booking error:', err && (err.stack || err.message || err));
    return res.status(500).json({ error: err?.message || "Failed to create booking" });
  }
});

// Get all bookings
app.get("/api/bookings", async (req, res) => {
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

// Get booking by ID
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

// Search bookings by location, date, typeOfCleaning
app.get("/api/bookings/search", async (req, res) => {
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

// Confirm booking with customer info + send confirmation email
app.put("/api/bookings/:id/confirm", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, address, phone, gdprConsent } = req.body;

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
      data: { name, email, address, phone, gdprConsent: true, price },
    });

    //await sendBookingConfirmation(booking);
    
    await sendBookingConfirmation(
    [booking.email, "office@putzelf.com"], // customer + office copy
    booking
    );

    res.json({ message: "Booking confirmed and email sent", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm booking" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
