"use server";

import { getUserById } from "@/helpers/server-helper/getUser";
import db from "@/lib/db";
import {
  profileDetailsSchema,
  ProfileDetailsType,
} from "@/lib/schemas/profileSchema";
import { revalidatePath } from "next/cache";

export default async function profileUpdate(inputData: ProfileDetailsType) {
  try {
    const isValid = profileDetailsSchema.safeParse(inputData);

    if (!isValid.success) {
      throw new Error(isValid.error?.errors[0].message);
    }
    const { id, profileName } = isValid.data;

    const userData = await getUserById(id);

    if (!userData) {
      throw new Error("User not found");
    }

    const user = await db.user.update({
      where: {
        id: userData.id,
      },
      data: {
        name: profileName,
      },
    });
    revalidatePath("/dashboard/profile");
    return user;
  } catch (err) {
    throw err;
  }
}
