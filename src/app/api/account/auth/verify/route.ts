import getTokenData from "@/helpers/server-helper/getTokenData";
import db from "@/lib/db";
import { getJsonBodyData } from "@/helpers/server-helper/getBodyData";
import serverAsyncResolve from "@/helpers/server-helper/serverAsyncResolve";
import serverResponse from "@/helpers/server-helper/serverResponse";
import { tokenSchema, type TokenSchemaType } from "@/lib/schemas/authSchema";
import { getUserById } from "@/helpers/server-helper/getUser";
import { verifyToken } from "@/utils/server-utils/manageToken";

export async function POST(req: Request) {
  return serverAsyncResolve(async () => {
    const body = await getJsonBodyData<TokenSchemaType>(req);

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

    const tokenData = await getTokenData({ where: { userId: user.id } });

    const currentTime = new Date();

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
