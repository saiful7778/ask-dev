import db from "../db";
import { TOKEN_EXPIRES_TIME } from "../staticData";
import { createToken } from "../utils/manageToken";

export default async function createVerifyToken(userId: string): Promise<{
  id: string;
  userId: string;
  token: string;
  expires: Date;
}> {
  const token = createToken(userId);

  await db.verificationToken.deleteMany({
    where: {
      userId,
    },
  });

  return db.verificationToken.create({
    data: {
      userId,
      token,
      expires: new Date(Date.now() + TOKEN_EXPIRES_TIME),
    },
  });
}
