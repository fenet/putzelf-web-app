import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function sendBookingConfirmation(booking) {
  if (!booking || !booking.email) {
    console.error("❌ Booking object invalid, cannot send email:", booking);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #5be3e3, #0097b2); padding: 20px; text-align: center; color: #fff;">
        <h1 style="margin: 0; font-size: 24px;">Booking Confirmation</h1>
      </div>

      <!-- Body -->
      <div style="padding: 20px;">
        <p style="font-size: 16px;">Dear <strong>${booking.name || "Customer"}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.5;">
          Your cleaning appointment has been <strong>confirmed</strong>. 🎉  
          Below are your booking details:
        </p>

        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📍 Location</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.location || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>📅 Date</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.date || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>⏰ Time</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.time || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>🧹 Cleaning Type</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.typeOfCleaning || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>⏳ Duration</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.duration || 0} hours</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>💬 Renegotiate if longer</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.renegotiate ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td style="padding: 8px;"><strong>💶 Price</strong></td>
            <td style="padding: 8px;">€${booking.price?.toFixed(2) || "0.00"}</td>
          </tr>
        </table>

        <p style="margin-top: 20px; font-size: 15px;">
          If you need to make any changes, simply reply to this email and we’ll be happy to assist.
        </p>

        <p style="font-size: 15px; margin-top: 20px;">
          Best regards,<br />
          <strong>PutzELF Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f1f1f1; padding: 20px; text-align: center; font-size: 13px; color: #666;">
        <!-- Links -->
        <div style="margin-bottom: 15px;">
          <a href="https://your-domain.com/terms" style="margin: 0 10px; color: #666; text-decoration: none;">Terms & Conditions</a> |
          <a href="https://your-domain.com/privacy" style="margin: 0 10px; color: #666; text-decoration: none;">Privacy Policy</a> |
          <a href="https://your-domain.com/imprint" style="margin: 0 10px; color: #666; text-decoration: none;">Imprint</a>
        </div>

        <!-- Social icons -->
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

        <!-- Copyright -->
        <div>
          © ${new Date().getFullYear()} PutzELF. All rights reserved.
        </div>
      </div>
    </div>
  </div>
  `;

  try {
    await transporter.sendMail({
      from: `"PutzELF" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      bcc: "office@putzelf.com",
      subject: "Your Booking Confirmation – PutzELF",
      text: "Your booking is confirmed! Please check the details in the email.",
      html: htmlContent,
    });
    console.log(`✅ Confirmation email sent to ${booking.email}`);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
}
