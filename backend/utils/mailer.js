import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";
import { WINDOW_PRICE_NET } from "../config.js";

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
    // createTransporter may reject; ensure we clear the cached promise on failure
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
  
  const customerEmail =
    booking.email || (Array.isArray(to) ? to[0] : to) || "N/A";
 
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
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📍 Standort</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${(booking.location || "vienna").toLowerCase() === "graz" ? "Graz" : "Wien"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🏠 Adresse</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.address || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📅 Datum</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formatGermanDate(booking.date)}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>⏰ Uhrzeit</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.time || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🧹 Reinigungsart</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.typeOfCleaning || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>⏳ Dauer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.duration || 0} Stunden</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📞 Telefon</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.phone || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📧 E-Mail</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${customerEmail}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🪟 Fenster</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.windows ? booking.windows : '—'}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📝 Anmerkungen</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${(booking.notes || "").toString().trim() ? (booking.notes || "").toString().trim().replace(/\n/g, "<br />") : "Keine"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🔄 Verlängerung möglich</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${formatYesNo(booking.renegotiate)}</td></tr>
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
          <a href="/files/Allgemeine_Geschäftsbedingungen_ Neu.pdf" style="margin: 0 10px; color: #666; text-decoration: none;">AGB</a> |
          <a href="/files/Datenschutzbestimmungen.pdf" style="margin: 0 10px; color: #666; text-decoration: none;">Datenschutz</a> |
          <a href="https://putzelf.com/imprint" style="margin: 0 10px; color: #666; text-decoration: none;">Impressum</a>
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
    const resolvedTo = targetRecipient;
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

/**
 * sendQuoteRequestConfirmation
 * For lead flow users (Angebot anfragen) who are not booking a service yet.
 */
export async function sendContactRequest(formData) {
  const normalized = formData || {};
  const locationKey = String(normalized.location || "vienna").trim().toLowerCase();
  const selectedLocation = locationKey === "graz" ? "Graz" : "Wien";
  const recipient = locationKey === "graz" ? "office.stmk@putzelf.com" : "office@putzelf.com";

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 20px; color: #333;">
    <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(90deg, #5be3e3, #0097b2); padding: 20px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">Contact Form Request</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; line-height: 1.5;">
          A new contact request has been submitted through the PutzELF website.
        </p>
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${normalized.name || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${normalized.email || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${normalized.phone || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Location</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${selectedLocation}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Subject</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${normalized.subject || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee; vertical-align: top;"><strong>Message</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${(normalized.message || "").toString().trim().replace(/\n/g, "<br />") || "—"}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 15px; color: #555;">
          This message was routed to the ${selectedLocation} team based on the selected form location.
        </p>
      </div>
    </div>
  </div>
  `;

  const transporter = await getTransporter();
  const info = await transporter.sendMail({
    from: `"PutzELF Contact" <${SMTP_FROM}>`,
    to: recipient,
    replyTo: normalized.email || SMTP_FROM,
    subject: `Contact Form Request – ${normalized.subject || "General Inquiry"}`,
    text: [
      "Contact Form Request",
      `Name: ${normalized.name || "N/A"}`,
      `Email: ${normalized.email || "N/A"}`,
      `Phone: ${normalized.phone || "N/A"}`,
      `Location: ${selectedLocation}`,
      `Subject: ${normalized.subject || "N/A"}`,
      `Message: ${normalized.message || "N/A"}`
    ].join("\n"),
    html: htmlContent,
  });

  console.log(`✅ Contact request email sent to ${recipient}: messageId=${info.messageId}`);
  return info;
}

export async function sendQuoteRequestConfirmation(toOrBooking, maybeBooking) {
  let to = toOrBooking;
  let booking = maybeBooking;

  if (!booking && toOrBooking && typeof toOrBooking === "object") {
    booking = toOrBooking;
    to = booking.email;
  }

  if (!to || (Array.isArray(to) && to.length === 0)) {
    console.error("❌ Quote request invalid: missing recipient (to).", to);
    throw new Error("Missing recipient (to).");
  }

  const bookingCustomerFields = getBookingCustomerFields(booking || {});

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(90deg, #5be3e3, #0097b2); padding: 20px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">Anfrage erhalten</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Hallo <strong>${booking?.name || "Kundin/Kunde"}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.5;">
          vielen Dank für Ihre Anfrage. Wir melden uns so schnell wie möglich bei Ihnen.
        </p>
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>👤 Vorname</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingCustomerFields.firstName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>👤 Nachname</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingCustomerFields.lastName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🏠 Straßenname</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingCustomerFields.streetName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🏡 Hausnummer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingCustomerFields.houseNumber}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🚪 Türnummer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingCustomerFields.doorNumber}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🏢 Gebäudenummer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingCustomerFields.buildingNumber}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📮 Postleitzahl</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingCustomerFields.postalCode}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📍 Ort</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingCustomerFields.city}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📍 Standort</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${(booking?.location || 'vienna').toLowerCase() === 'graz' ? 'Graz' : 'Wien'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📞 Telefonnummer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${bookingCustomerFields.phone}">${bookingCustomerFields.phone}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📧 E-Mail-Adresse</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${bookingCustomerFields.email}">${bookingCustomerFields.email}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>💬 Nachricht</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${(booking?.message || "").toString().trim().replace(/\n/g, "<br />") || "—"}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 15px;">
          Bei Rückfragen antworten Sie einfach auf diese E-Mail.
        </p>
        <p style="font-size: 15px; margin-top: 20px;">
          Mit freundlichen Grüßen,<br />
          <strong>PutzELF Team</strong>
        </p>
      </div>
    </div>
  </div>
  `;

  const transporter = await getTransporter();
  const resolvedTo = getBookingRecipient(booking?.location || "vienna");
  console.log("Sending quote request email", {
    from: SMTP_FROM,
    to: resolvedTo,
    subject: "Ihre Anfrage bei PutzELF",
  });
  const info = await transporter.sendMail({
    from: `"PutzELF" <${SMTP_FROM}>`,
    to: resolvedTo,
    subject: "Ihre Anfrage bei PutzELF",
    text: `Vielen Dank für Ihre Anfrage. Name: ${booking?.name || "N/A"}, Firma: ${booking?.company || "—"}, Standort: ${(booking?.location || 'vienna')}, Adresse: ${booking?.address || "—"}, E-Mail: ${booking?.email || "N/A"}, Telefon: ${booking?.phone || "N/A"}, Nachricht: ${booking?.message || "—"}`,
    html: htmlContent,
  });

  console.log(`✅ Quote request email sent: messageId=${info.messageId} response=${info.response}`);
  return info;
}
