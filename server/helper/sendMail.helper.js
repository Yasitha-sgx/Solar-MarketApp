import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

export const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `SolarMarket" ${process.env.MAIL_USER}`,
      to,
      subject,
      text,
      html,
    });

    return info.messageId;
  } catch (error) {
    res.status(500).json({ message: "Failed to send email: " + error.message });
  }
};
