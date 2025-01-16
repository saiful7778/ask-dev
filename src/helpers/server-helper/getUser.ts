import db from "@/lib/db";

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
