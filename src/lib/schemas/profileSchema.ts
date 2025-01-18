import * as z from "zod";
import { MAX_IMAGE_SIZE } from "../staticData";

export const profileDetailsSchema = z.object({
  avatar: z
    .instanceof(File, {
      message: "Please upload the valid image file",
    })
    .refine(
      (file) => ["image/jpg", "image/jpeg", "image/png"].includes(file.type),
      {
        message: "Image must be in JPG or JPEG or PNG format",
      },
    )
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: "Image size should be less than 5 MB",
    })
    .nullable()
    .optional(),
  userName: z
    .string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .max(80, "Username is too long")
    .regex(/^\S*$/, { message: "Username should not contain spaces" }),
  profileName: z
    .string({ required_error: "Profile name is required" })
    .min(1, "Profile name is required")
    .max(80, "Profile name is too long"),
});

export type ProfileDetailsType = z.infer<typeof profileDetailsSchema>;
