import db from "@/lib/db";
import { registerSchema } from "@/lib/schemas/authSchema";
import { getJsonBodyData } from "@/helpers/server-helper/getBodyData";
import { getUserByEmail } from "@/helpers/server-helper/getUser";
import serverAsyncResolve from "@/helpers/server-helper/serverAsyncResolve";
import serverResponse from "@/helpers/server-helper/serverResponse";
import { genSalt, hash } from "bcrypt";
import sendVerifyToken from "@/helpers/server-helper/sendVerifyToken";
import generateUsername from "@/utils/server-utils/generateUsername";

export async function POST(req: Request) {
  return serverAsyncResolve(async () => {
    const body = await getJsonBodyData<{
      fullName: string;
      email: string;
      password: string;
    }>(req);

    const { email, fullName, password } = registerSchema.parse(body);

    const userExist = await getUserByEmail(email);

    if (!!userExist) {
      return serverResponse({
        success: false,
        error: "User is already registered",
        status: 400,
      });
    }

    const saltValue = await genSalt(10);
    const hashedPassword = await hash(password, saltValue);

    const username = await generateUsername(fullName);

    const user = await db.user.create({
      data: {
        name: fullName,
        email,
        username,
        hashedPassword: hashedPassword,
      },
    });

    await sendVerifyToken(user);

    return serverResponse<typeof user>({
      success: true,
      data: user,
      status: 201,
    });
  });
}
