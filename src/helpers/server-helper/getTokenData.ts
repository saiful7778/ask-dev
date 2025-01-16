import db from "@/lib/db";
import type { Prisma } from "@prisma/client";
import { ServerError } from "./ServerError";

export default async function getTokenData({
  where,
}: {
  where: Prisma.VerificationTokenWhereInput;
}): Promise<{
  id: string;
  userId: string;
  token: string;
  expires: Date;
}> {
  const tokenData = await db.verificationToken.findFirst({
    where,
  });

  if (!tokenData) {
    throw new ServerError("Token not found", "TokenNotFound");
  }

  const expireTime = new Date(tokenData.expires);
  const currentTime = new Date();

  if (expireTime.getTime() <= currentTime.getTime()) {
    throw new ServerError("Token is expired", "TokenExpired");
  }

  return tokenData;
}
