import { getJsonBodyData } from "@/lib/helpers/getBodyData";
import sendVerifyToken from "@/lib/helpers/sendVerifyToken";
import serverAsyncResolve from "@/lib/helpers/serverAsyncResolve";
import serverResponse from "@/lib/helpers/serverResponse";
import { sendTokenSchema } from "@/lib/schemas/authSchema";
import { getUserByEmail } from "@/lib/utils/getUser";

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
