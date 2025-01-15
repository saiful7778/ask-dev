import db from "../db";

export default async function generateUsername(
  name: string,
  attempt: number = 0,
): Promise<string> {
  let username = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (attempt > 0) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    username = `${username}${randomSuffix}`;
  }

  const isExist = await db.user.findFirst({
    where: {
      username: username,
    },
  });

  if (isExist) {
    return generateUsername(name, attempt + 1);
  }

  return username;
}
