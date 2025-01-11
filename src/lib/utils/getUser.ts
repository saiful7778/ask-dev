import db from "../db";

export async function getUserByEmail(email: string) {
  return db.user.findFirst({
    where: {
      email,
    },
  });
}
export async function getUserById(id: string) {
  return db.user.findFirst({
    where: {
      id,
    },
  });
}
