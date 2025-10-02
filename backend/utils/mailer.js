import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

// Config (support both new SMTP_* names and older EMAIL_* fallbacks)
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
const SMTP_SECURE =
  typeof process.env.SMTP_SECURE !== "undefined"
    ? process.env.SMTP_SECURE === "true"
    : SMTP_PORT === 465;
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
  if (!_transporterPromise) _transporterPromise = createTransporter();
  return _transporterPromise;
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
  let to, booking;

  if (typeof maybeBooking === "undefined") {
    // single-arg: booking
    booking = toOrBooking;
    to = booking && booking.email;
  } else {
    // two args provided
    if (typeof toOrBooking === "object" && typeof maybeBooking === "string") {
      // probably sendBookingConfirmation(booking, to)
      booking = toOrBooking;
      to = maybeBooking;
    } else if (typeof toOrBooking === "string") {
      // normal: sendBookingConfirmation(to, booking)
      to = toOrBooking;
      booking = maybeBooking;
    } else {
      // fallback: try best effort
      to = toOrBooking;
      booking = maybeBooking;
    }
  }

  // Optional: remove debug logs in production
  console.log("DEBUG sendBookingConfirmation called. to:", to);
  console.log("DEBUG booking keys:", booking ? Object.keys(booking) : "undefined");

  // Basic validation
  if (!to || (Array.isArray(to) && to.length === 0)) {
    console.error("❌ Booking object invalid: missing recipient (to).", to);
    throw new Error("Missing recipient (to).");
  }
  if (!booking || !booking.date || !booking.time) {
    console.error("❌ Booking object invalid, cannot send email:", booking);
    throw new Error("Invalid booking details. 'date' and 'time' are required.");
  }

  // Build HTML (kept your template, but using the booking variable)
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(90deg, #5be3e3, #0097b2); padding: 20px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">Booking Confirmation</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Dear <strong>${booking.name || "Customer"}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.5;">
          Your cleaning appointment has been <strong>confirmed</strong>. 🎉  
          Below are your booking details:
        </p>
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📍 Location</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.location || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📅 Date</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.date || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>⏰ Time</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.time || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🧹 Cleaning Type</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.typeOfCleaning || "N/A"}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>⏳ Duration</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.duration || 0} hours</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>💬 Renegotiate if longer</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.renegotiate ? "Yes" : "No"}</td></tr>
          <tr><td style="padding: 8px;"><strong>💶 Price</strong></td><td style="padding: 8px;">€${(typeof booking.price === "number" ? booking.price.toFixed(2) : booking.price) || "0.00"}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 15px;">
          If you need to make any changes, simply reply to this email and we’ll be happy to assist.
        </p>
        <p style="font-size: 15px; margin-top: 20px;">
          Best regards,<br />
          <strong>PutzELF Team</strong>
        </p>
      </div>
      <div style="background: #f1f1f1; padding: 20px; text-align: center; font-size: 13px; color: #666;">
        <div style="margin-bottom: 15px;">
          <a href="https://your-domain.com/terms" style="margin: 0 10px; color: #666; text-decoration: none;">Terms & Conditions</a> |
          <a href="https://your-domain.com/privacy" style="margin: 0 10px; color: #666; text-decoration: none;">Privacy Policy</a> |
          <a href="https://your-domain.com/imprint" style="margin: 0 10px; color: #666; text-decoration: none;">Imprint</a>
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
        <div>© ${new Date().getFullYear()} PutzELF. All rights reserved.</div>
      </div>
    </div>
  </div>
  `;

  try {
    const transporter = await getTransporter();
    const info = await transporter.sendMail({
      from: `"PutzELF" <${SMTP_FROM}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      bcc: SMTP_BCC,
      subject: "Your Booking Confirmation – PutzELF",
      text: "Your booking is confirmed! Please check the details in the email.",
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
