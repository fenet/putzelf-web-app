import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Hetzner SMTP transporter
const transporter = nodemailer.createTransport({
  host: "mail.your-server.de", // <- leave this exactly as given in konsoleH
  port: 587,                   // use 465 with secure: true if you prefer SSL
  secure: false,               // true = port 465, false = port 587
  auth: {
    user: process.env.SMTP_USER, // e.g. office@putzelf.com
    pass: process.env.SMTP_PASS, // mailbox password from konsoleH
  },
});

// function to send email
export const sendBookingConfirmation = async (to, bookingDetails) => {
  try {
    await transporter.sendMail({
      from: `"PutzELF" <${process.env.SMTP_FROM}>`,
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

    console.log("✅ Confirmation email sent to:", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};


