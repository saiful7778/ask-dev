import type { NextApiRequest } from "next";
import { getToken, type JWT } from "next-auth/jwt";
import { ServerError } from "./ServerError";
import type { NextRequest } from "next/server";

export async function getAuth(req: NextApiRequest | NextRequest): Promise<JWT> {
  const session = await getToken({ req });
  if (!session) {
    throw new ServerError("Unauthenticated request", "unauthorized");
  }
  return session;
}
