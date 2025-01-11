import db from "@/lib/db";
import { registerSchema } from "@/lib/schemas/authSchema";
import { getJsonBodyData, sendBodyError } from "@/lib/utils/getBodyData";
import { getUserByEmail } from "@/lib/utils/getUser";
import serverAsyncResolve from "@/lib/utils/serverAsyncResolve";
import serverResponse from "@/lib/utils/serverResponse";
import { genSalt, hash } from "bcrypt";

export async function POST(req: Request) {
  return serverAsyncResolve(async () => {
    const body = await getJsonBodyData<{
      fullName: string;
      email: string;
      password: string;
    }>(req);

    if (!body) {
      return sendBodyError();
    }

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

    return serverResponse<typeof user>({
      success: true,
      data: user,
      status: 201,
    });
  });
}
