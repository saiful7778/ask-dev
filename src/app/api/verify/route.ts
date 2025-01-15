import db from "@/lib/db";
import { getJsonBodyData, sendBodyError } from "@/lib/helpers/getBodyData";
import serverAsyncResolve from "@/lib/helpers/serverAsyncResolve";
import serverResponse from "@/lib/helpers/serverResponse";
import { tokenSchema } from "@/lib/schemas/authSchema";
import { getUserById } from "@/lib/utils/getUser";
import { verifyToken } from "@/lib/utils/manageToken";

export async function POST(req: Request) {
  return serverAsyncResolve(async () => {
    const body = await getJsonBodyData<{
      token: string;
    }>(req);

    if (!body) {
      return sendBodyError();
    }

    const { token } = tokenSchema.parse(body);

    const userId = await verifyToken<string>(token);

    if (!userId) {
      return serverResponse({
        success: false,
        error: "Invalid token",
        status: 400,
      });
    }

    const user = await getUserById(userId);

    if (!user) {
      return serverResponse({
        success: false,
        error: "User not found",
        status: 404,
      });
    }

    const tokenData = await db.verificationToken.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!tokenData) {
      return serverResponse({
        success: false,
        error: "Token not found",
        status: 404,
      });
    }

    const expireTime = new Date(tokenData.expires);
    const currentTime = new Date();

    if (expireTime.getTime() <= currentTime.getTime()) {
      return serverResponse({
        success: false,
        error: "Token is expired",
        status: 401,
      });
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: currentTime.toISOString(),
      },
    });

    await db.verificationToken.delete({
      where: {
        id: tokenData.id,
      },
    });

    return serverResponse({
      success: true,
      message: "Email is verified",
      status: 201,
    });
  });
}
