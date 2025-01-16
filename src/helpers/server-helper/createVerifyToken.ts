import db from "@/lib/db";
import { TOKEN_EXPIRES_TIME } from "@/lib/staticData";
import { createToken } from "@/utils/server-utils/manageToken";

export default async function createVerifyToken(userId: string): Promise<{
  id: string;
  userId: string;
  token: string;
  expires: Date;
}> {
  const token = createToken(userId);

  const tokenData = await db.verificationToken.findFirst({
    where: {
      userId,
    },
  });

  if (tokenData) {
    const expireTime = new Date(tokenData.expires);
    const currentTime = new Date();

    if (expireTime.getTime() <= currentTime.getTime()) {
      await db.verificationToken.deleteMany({
        where: {
          userId,
        },
      });

      return createNewDBToken(userId, token);
    }
    return tokenData;
  }

  return createNewDBToken(userId, token);
}

function createNewDBToken(userId: string, token: string) {
  return db.verificationToken.create({
    data: {
      userId,
      token,
      expires: new Date(Date.now() + TOKEN_EXPIRES_TIME),
    },
  });
}
