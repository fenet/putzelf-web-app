import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 587);
const secure = (process.env.SMTP_SECURE === "false"); // true for port 465
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

if (!host || !user || !pass) {
  console.error("Missing SMTP configuration (SMTP_HOST/SMTP_USER/SMTP_PASS). Check your .env");
}

// Helper to prefer IPv4 when needed. Use only as a fallback test; recommended for debugging.
async function resolveIPv4(hostname) {
  return new Promise((resolve) => {
    dns.lookup(hostname, { family: 4 }, (err, address) => {
      if (err) return resolve(null);
      resolve(address);
    });
  });
}

async function createTransporter() {
  // Try normal DNS name first
  let transportOptions = {
    host,
    port,
    secure, // true for 465, false for 587 (STARTTLS)
    auth: { user, pass },
    requireTLS: false,               // we'll allow STARTTLS when server advertises it
    connectionTimeout: 30000,        // 30s connection timeout
    greetingTimeout: 30000,
    socketTimeout: 30000,
    tls: {
      // accept the server cert (set false only while debugging)
      rejectUnauthorized: false,
      minVersion: "TLSv1.2",
    },
    logger: true,
    debug: true,
  };

  // If secure is true but port is 587 (misconfiguration), override to false for STARTTLS
  if (port === 587 && secure === true) {
    console.warn("Override secure=true on port 587 -> using secure=false for STARTTLS.");
    transportOptions.secure = false;
  }

  const transporter = nodemailer.createTransport(transportOptions);

  try {
    await transporter.verify();
    console.log("SMTP transporter verified (using host name)", host);
    return transporter;
  } catch (err) {
    console.warn("SMTP verify failed with host name:", err && err.message);

    // Fallback: try resolving IPv4 address and connect directly to it (avoids IPv6 issues)
    const ipv4 = await resolveIPv4(host);
    if (ipv4) {
      console.log("Attempting fallback to IPv4 address:", ipv4);
      transportOptions.host = ipv4;
      // re-create transporter
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

let _transporterPromise = null;
function getTransporter() {
  if (!_transporterPromise) _transporterPromise = createTransporter();
  return _transporterPromise;
}

export const sendBookingConfirmation = async (to, bookingDetails) => {
  // Basic validation
  if (!to || (Array.isArray(to) && to.length === 0)) {
    console.error("❌ Booking object invalid: missing recipient (to).", to);
    throw new Error("Missing recipient (to).");
  }
  if (!bookingDetails || !bookingDetails.date || !bookingDetails.time) {
    console.error("❌ Booking object invalid, cannot send email:", to);
    throw new Error("Invalid booking details.");
  }

  try {
    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: `"PutzELF" <${process.env.SMTP_FROM || user}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject: "Booking Confirmation - PutzELF",
      html: `
        <h2>Thank you for your booking!</h2>
        <p>Here are your booking details:</p>
        <ul>
          <li><b>Date:</b> ${bookingDetails.date}</li>
          <li><b>Time:</b> ${bookingDetails.time}</li>
          <li><b>Duration:</b> ${bookingDetails.duration} hours</li>
          <li><b>Type of Cleaning:</b> ${bookingDetails.typeOfCleaning}</li>
          <li><b>Price:</b> €${bookingDetails.price}</li>
        </ul>
        <p>We’ll be in touch shortly. If you have any questions, just reply to this email.</p>
      `,
    });

    console.log("✅ Confirmation email sent:", info.messageId, info.response);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error && (error.message || error));
    // More detailed nodemailer info if available
    if (error && error.code) console.error("code:", error.code);
    if (error && error.response) console.error("response:", error.response);
    throw error;
  }
};
