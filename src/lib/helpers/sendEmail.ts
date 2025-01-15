import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

class NodeMailerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NodeMailerError";
  }
}

export default async function sendEmail({
  toEmail,
  subject,
  text,
  html,
}: {
  toEmail: string;
  subject: string;
  text?: string | undefined;
  html?: string | undefined;
}): Promise<SMTPTransport.SentMessageInfo> {
  try {
    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    return transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: toEmail,
      subject,
      text,
      html,
    });
  } catch {
    throw new NodeMailerError("Failed to send email");
  }
}
