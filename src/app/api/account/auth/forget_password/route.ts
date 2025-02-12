import createVerifyToken from "@/helpers/server-helper/createVerifyToken";
import { getJsonBodyData } from "@/helpers/server-helper/getBodyData";
import sendEmail from "@/utils/server-utils/sendEmail";
import serverAsyncResolve from "@/helpers/server-helper/serverAsyncResolve";
import serverResponse from "@/helpers/server-helper/serverResponse";
import {
  forgetPasswordSchema,
  type ForgetPasswordType,
} from "@/lib/schemas/authSchema";
import { getUserByEmail } from "@/helpers/server-helper/getUser";

export async function POST(req: Request) {
  return serverAsyncResolve(async () => {
    const body = await getJsonBodyData<ForgetPasswordType>(req);

    const { email } = forgetPasswordSchema.parse(body);

    const userData = await getUserByEmail(email);

    if (!userData) {
      return serverResponse({
        success: false,
        error: "User doesn't exist",
        status: 400,
      });
    }

    const token = await createVerifyToken(userData.id);

    sendEmail({
      toEmail: userData.email,
      subject: "Reset your password",
      html: `
        <div>Hey ${userData.name},</div>
        <br />
        <div>Thank you for joining <a href="${process.env.NEXTAUTH_URL}">ASK-DEV</a>. To reset your password please click the link below:</div>
        <br />
        <a href="${process.env.NEXTAUTH_URL}/reset_password?token=${token.token}">Reset password</a>
        <br />
        <br />
        <div>Best Regards,</div>
        <div>Saiful Islam</div>`,
    });

    return serverResponse({
      success: true,
      message: "Reset password was sent",
    });
  });
}
