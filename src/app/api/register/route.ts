import db from "@/lib/db";
import { registerSchema } from "@/lib/schemas/authSchema";
import { getJsonBodyData } from "@/lib/helpers/getBodyData";
import { getUserByEmail } from "@/lib/utils/getUser";
import serverAsyncResolve from "@/lib/helpers/serverAsyncResolve";
import serverResponse from "@/lib/helpers/serverResponse";
import { genSalt, hash } from "bcrypt";
import sendVerifyToken from "@/lib/helpers/sendVerifyToken";

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

    const user = await db.user.create({
      data: {
        name: fullName,
        email,
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
