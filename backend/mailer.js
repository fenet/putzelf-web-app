import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// function to send email
export const sendBookingConfirmation = async (to, bookingDetails) => {
  try {
    await transporter.sendMail({
      from: `"PutzELF" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Booking Confirmation - PutzELF",
      html: `
        <h2>Thank you for your booking!</h2>
        <p>Here are your booking details:</p>
        <ul>
          <li><b>Date:</b> ${bookingDetails.date}</li>
          <li><b>Time:</b> ${bookingDetails.time}</li>
          <li><b>Duration:</b> ${bookingDetails.duration} hours</li>
          <li><b>Type of Cleaning:</b> ${bookingDetails.cleaningType}</li>
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

