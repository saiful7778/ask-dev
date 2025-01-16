import { getJsonBodyData } from "@/helpers/server-helper/getBodyData";
import sendVerifyToken from "@/helpers/server-helper/sendVerifyToken";
import serverAsyncResolve from "@/helpers/server-helper/serverAsyncResolve";
import serverResponse from "@/helpers/server-helper/serverResponse";
import { sendTokenSchema } from "@/lib/schemas/authSchema";
import { getUserByEmail } from "@/helpers/server-helper/getUser";

export async function POST(req: Request) {
  return serverAsyncResolve(async () => {
    const body = await getJsonBodyData<{
      email: string;
    }>(req);

    const { email } = sendTokenSchema.parse(body);

    const user = await getUserByEmail(email);

    if (!user) {
      return serverResponse({
        success: false,
        error: "User not found",
        status: 404,
      });
    }

    await sendVerifyToken(user);

    return serverResponse({
      success: true,
      message: "Token sent successfully",
    });
  });
}
