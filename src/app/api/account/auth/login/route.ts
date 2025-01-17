import { getJsonBodyData } from "@/helpers/server-helper/getBodyData";
import serverAsyncResolve from "@/helpers/server-helper/serverAsyncResolve";
import serverResponse from "@/helpers/server-helper/serverResponse";
import { loginSchema } from "@/lib/schemas/authSchema";
import { getUserByEmail } from "@/helpers/server-helper/getUser";
import { compare } from "bcrypt";

export async function POST(req: Request) {
  return serverAsyncResolve(async () => {
    const body = await getJsonBodyData<{
      email: string;
      password: string;
    }>(req);

    const { email, password } = loginSchema.parse(body);

    const userData = await getUserByEmail(email);

    if (!userData) {
      return serverResponse({
        success: false,
        error: "User doesn't exist",
        status: 404,
      });
    }

    if (!userData?.hashedPassword) {
      return serverResponse({
        success: false,
        error: "This user is not credential account",
        status: 400,
      });
    }

    const isPasswordValid = await compare(password, userData.hashedPassword);

    if (!isPasswordValid) {
      return serverResponse({
        success: false,
        error: "Incorrect password",
        status: 400,
      });
    }

    if (!userData?.emailVerified) {
      return serverResponse({
        success: false,
        error: "Email is not verified",
        status: 400,
      });
    }

    if (!userData?.access) {
      return serverResponse({
        success: false,
        error: "User does not have access",
        status: 403,
      });
    }

    return serverResponse<typeof userData>({
      success: true,
      message: "Login successful",
      data: userData,
      status: 200,
    });
  });
}
