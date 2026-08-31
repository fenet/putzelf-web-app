import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";
import { WINDOW_PRICE_NET, TAX_RATE } from "./config.js";

dotenv.config();

// Config (support both new SMTP_* names and older EMAIL_* fallbacks)
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const SMTP_SECURE =
  typeof process.env.SMTP_SECURE !== "undefined"
    ? process.env.SMTP_SECURE === "true"
    : SMTP_PORT === 587;
const SMTP_USER = process.env.SMTP_USER || process.env.EMAIL_USER;
const SMTP_PASS = process.env.SMTP_PASS || process.env.EMAIL_PASS;
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || process.env.EMAIL_USER;
const SMTP_BCC = process.env.SMTP_BCC || "office@putzelf.com";

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.warn("Warning: missing SMTP config. Check SMTP_HOST / SMTP_USER / SMTP_PASS");
}

// IPv4 fallback helper
async function resolveIPv4(hostname) {
  return new Promise((resolve) => {
    dns.lookup(hostname, { family: 4 }, (err, address) => {
      if (err) return resolve(null);
      resolve(address);
    });
  });
}

async function createTransporter() {
  let transportOptions = {
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE, // true for 465, false for 587 (STARTTLS)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    requireTLS: true,
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    tls: {
      // while debugging it's okay to set false; set to true in production when certs are valid
      rejectUnauthorized: false,
      minVersion: "TLSv1.2",
    },
    logger: true,
    debug: true,
  };

  // If someone sets secure=true but port is 587, prefer STARTTLS
  if (SMTP_PORT === 587 && transportOptions.secure === true) {
    console.warn("Override secure=true on port 587 -> using secure=false for STARTTLS.");
    transportOptions.secure = false;
  }

  const transporter = nodemailer.createTransport(transportOptions);

  try {
    await transporter.verify();
    console.log("SMTP transporter verified (using host name)", SMTP_HOST);
    return transporter;
  } catch (err) {
    console.warn("SMTP verify failed with host name:", err && err.message);
    // try IPv4 fallback
    const ipv4 = await resolveIPv4(SMTP_HOST);
    if (ipv4) {
      console.log("Attempting SMTP fallback to IPv4 address:", ipv4);
      transportOptions.host = ipv4;
      const t2 = nodemailer.createTransport(transportOptions);
      try {
        await t2.verify();
        console.log("SMTP transporter verified (using IPv4)", ipv4);
        return t2;
      } catch (err2) {
        console.error("Fallback IPv4 verify also failed:", err2 && err2.message);
        throw err2;
      }
    } else {
      throw err;
    }
  }
}

// Cache one transporter promise for reuse
let _transporterPromise = null;
function getTransporter() {
  if (!_transporterPromise) {
    _transporterPromise = createTransporter().catch((err) => {
      _transporterPromise = null;
      throw err;
    });
  }
  return _transporterPromise;
}

function formatGermanDate(value) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatYesNo(value) {
  return value ? "Ja" : "Nein";
}

function getBookingRecipient(location) {
  const normalizedLocation = String(location || "vienna").trim().toLowerCase();
  return normalizedLocation === "graz" ? "graz.booking@putzelf.com" : "wien.booking@putzelf.com";
}

function getBookingCustomerFields(booking = {}) {
  const rawPhone = booking.phone || "N/A";
  const rawEmail = booking.email || "N/A";
  const rawName = booking.name || "";
  const nameParts = String(rawName).trim().split(/\s+/).filter(Boolean);

  return {
    firstName: booking.firstName || nameParts[0] || "N/A",
    lastName: booking.lastName || nameParts.slice(1).join(" ") || "N/A",
    streetName: booking.streetName || "N/A",
    houseNumber: booking.houseNumber || "N/A",
    doorNumber: booking.doorNumber || "N/A",
    buildingNumber: booking.buildingNumber || "N/A",
    postalCode: booking.postalCode || "N/A",
    city: booking.city || "N/A",
    phone: rawPhone,
    email: rawEmail,
  };
}

/**
 * sendBookingConfirmation
 * Accepts either:
 *   sendBookingConfirmation(booking)               // older style (booking.email used)
 * or
 *   sendBookingConfirmation(to, booking)           // newer style (to can be string or array)
 */
export async function sendBookingConfirmation(toOrBooking, maybeBooking) {
  // Backwards compatibility: handle single-arg booking object
  let to = toOrBooking;
  let booking = maybeBooking;

  if (!booking && toOrBooking && typeof toOrBooking === "object") {
    // called as sendBookingConfirmation(booking)
    booking = toOrBooking;
    to = booking.email;
  }

  // DEBUG logs
  try {
    console.log("DEBUG sendBookingConfirmation called. to:", to);
    console.log("DEBUG booking keys:", booking ? Object.keys(booking) : "undefined");
  } catch (e) {}

  // Basic validation
  if (!to || (Array.isArray(to) && to.length === 0)) {
    console.error("❌ Booking object invalid: missing recipient (to).", to);
    throw new Error("Missing recipient (to).");
  }
  if (!booking || !booking.date || !booking.time) {
    console.error("❌ Booking object invalid, cannot send email:", booking);
    throw new Error("Invalid booking details. 'date' and 'time' are required.");
  }

  const customerEmail = booking.email || (Array.isArray(to) ? to[0] : to) || "N/A";
  const bookingLocation = String(booking.location || "vienna").trim().toLowerCase();
  const bookingRecipient = getBookingRecipient(bookingLocation);
  const rawRecipient = Array.isArray(to) ? to[0] : String(to || "");
  const targetRecipient =
    booking && rawRecipient && rawRecipient.toLowerCase() === String(booking.email || "").toLowerCase()
      ? rawRecipient
      : bookingRecipient;
  const customerFields = getBookingCustomerFields(booking);

  // inline SVGs for theme-colored icons
  const svg = {
    location: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#0097b2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>`,
    calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#0097b2" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V6c0-1.11-.89-2-2-2zm0 14H5V9h14v9z"/></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#0097b2" d="M12 20c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm1-13h-2v6l5 3 1-1.54-4-2.46V7z"/></svg>`,
    broom: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#0097b2" d="M7 16l-4 4 1 1 4-4 7-7-5-5L7 16zM20.71 7.04l-1.41-1.41-2.83 2.83 1.41 1.41 2.83-2.83z"/></svg>`,
    timer: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#0097b2" d="M15.07 1L14 2.07 16.94 5 18 3.93 15.07 1zM12 8v5l4 2 .75-1.23-3.25-1.77V8h-1.5zM6.54 4.21L5.1 5.65C6.16 6.41 7 7.5 7 9c0 1.66-1 3-3 3v2c3.31 0 6-2.69 6-6 0-1.93-1.02-3.61-2.46-4.79zM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#0097b2" d="M6.6 10.8c1.9 3.8 4.9 6.8 8.7 8.7l2.2-2.2c.3-.3.8-.4 1.2-.2 1.3.5 2.8.8 4.3.8.4 0 .8.3.9.7.2 1 .4 2 .4 3.1 0 .5-.4.9-.9.9C11.7 24 0 12.3 0 0.9 0 .4.4 0 .9 0c1.1 0 2.1.1 3.1.4.4.1.7.5.7.9 0 1.5.3 3 .8 4.3.2.4.1.9-.2 1.2L6.6 10.8z"/></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#0097b2" d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V6c0-1.11-.89-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    anmerkungen: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#0097b2" d="M20 2H4c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2zm-4 6H6v-2h8v2z"/></svg>`,
    verlangerung: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="#0097b2" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.1-.3 2.13-.82 3.01l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm-6 8c0-1.1.3-2.13.82-3.01L5.36 7.53A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3c-3.31 0-6-2.69-6-6z"/></svg>`,
  };

  // Build HTML (kept your template, but using the booking variable)
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(90deg, #5be3e3, #0097b2); padding: 20px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">Anfragebestätigung</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Hallo <strong>${booking.name || "Customer"}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.5;">
          Vielen Dank für Ihre Anfrage. Wir haben Ihre Anfrage erhalten und werden uns telefonisch bei Ihnen melden, um den Termin zu besprechen und zu bestätigen.
        </p>
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${svg.location} Standort</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${(booking.location || "vienna").toLowerCase() === "graz" ? "Graz" : "Wien"}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>👤 Vorname</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customerFields.firstName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>👤 Nachname</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customerFields.lastName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🏠 Straßenname</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customerFields.streetName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🏡 Hausnummer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customerFields.houseNumber}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🚪 Türnummer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customerFields.doorNumber}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🏢 Gebäudenummer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customerFields.buildingNumber}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📮 Postleitzahl</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customerFields.postalCode}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📍 Ort</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customerFields.city}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${svg.calendar} Datum</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formatGermanDate(booking.date)}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${svg.clock} Uhrzeit</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.time || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${svg.broom} Reinigungsart</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.typeOfCleaning || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${svg.timer} Dauer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.duration || 0} Stunden</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${svg.phone} Telefonnummer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${customerFields.phone}">${customerFields.phone}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${svg.mail} E-Mail-Adresse</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${customerFields.email}">${customerFields.email}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Fenster</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.windows ? booking.windows : '—'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Anmerkungen</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${(booking.notes || "").toString().trim() ? (booking.notes || "").toString().trim().replace(/\n/g, "<br />") : "Keine"}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Verlängerung möglich</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formatYesNo(booking.renegotiate)}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 15px;">
          Vielen Dank für Ihre Anfrage. Wir haben Ihre Anfrage erhalten. Unser Team wird sich telefonisch bei Ihnen melden, um den Termin zu besprechen und zu bestätigen.
        </p>
        <p style="font-size: 15px; margin-top: 20px;">
          Mit freundlichen Grüßen,<br />
          <strong>PutzELF Team</strong>
        </p>
        <p style="font-size: 14px; margin-top: 20px; line-height: 1.5; color: #555;">
          Bitte beachten Sie: Der Termin wird nach Rücksprache mit Ihnen telefonisch bestätigt.
        </p>
      </div>
      <div style="background: #f1f1f1; padding: 20px; text-align: center; font-size: 13px; color: #666;">
        <div style="margin-bottom: 15px;">
          <a href="https://your-domain.com/terms" style="margin: 0 10px; color: #666; text-decoration: none;">AGB</a> |
          <a href="https://your-domain.com/privacy" style="margin: 0 10px; color: #666; text-decoration: none;">Datenschutz</a> |
          <a href="https://your-domain.com/imprint" style="margin: 0 10px; color: #666; text-decoration: none;">Impressum</a>
        </div>
        <div style="margin-bottom: 15px;">
          <a href="https://instagram.com" style="margin: 0 8px;" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;" />
          </a>
          <a href="https://facebook.com" style="margin: 0 8px;" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style="width: 24px; height: 24px;" />
          </a>
          <a href="https://linkedin.com" style="margin: 0 8px;" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" style="width: 24px; height: 24px;" />
          </a>
        </div>
        <div>© ${new Date().getFullYear()} PutzELF. Alle Rechte vorbehalten.</div>
      </div>
    </div>
  </div>
  `;

  try {
    const transporter = await getTransporter();
    const resolvedTo = to;
    console.log("Sending booking confirmation email", {
      from: SMTP_FROM,
      to: resolvedTo,
      subject: "Buchungsbestätigung – PutzELF",
    });
    const info = await transporter.sendMail({
      from: `"PutzELF" <${SMTP_FROM}>`,
      to: resolvedTo,
      subject: "Anfragebestätigung – PutzELF",
      text: "Vielen Dank für Ihre Anfrage. Wir haben Ihre Anfrage erhalten. Unser Team meldet sich telefonisch bei Ihnen, um den Termin zu besprechen und zu bestätigen.",
      html: htmlContent,
    });

    console.log(`✅ Confirmation email sent: messageId=${info.messageId} response=${info.response}`);
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err && (err.message || err));
    if (err && err.code) console.error("code:", err.code);
    if (err && err.response) console.error("response:", err.response);
    if (err && err.responseCode) console.error("responseCode:", err.responseCode);
    throw err;
  }
}
