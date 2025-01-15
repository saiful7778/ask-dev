import { UserType } from "@/types";
import createVerifyToken from "./createVerifyToken";
import sendEmail from "./sendEmail";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export default async function sendVerifyToken(
  userData: UserType,
): Promise<SMTPTransport.SentMessageInfo> {
  const token = await createVerifyToken(userData.id);

  return sendEmail({
    toEmail: userData.email,
    subject: "Verify your email address",
    html: `
          <div>Hey ${userData.name},</div>
          <br />
          <div>Thank you for joining <a href="${process.env.NEXTAUTH_URL}">ASK-DEV</a> To activate your account and start exploring, please click the verification link below:</div>
          <br />
          <a href="${process.env.NEXTAUTH_URL}/verify?token=${token.token}">Click to verify</a>
          <br />
          <br />
          <div>Best Regards,</div>
          <div>Saiful Islam</div>`,
  });
}
