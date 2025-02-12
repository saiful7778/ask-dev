import * as z from "zod";

export const profileDetailsSchema = z.object({
  id: z
    .string({ required_error: "ID is required" })
    .min(1, "ID is required")
    .max(80, "ID is too long")
    .regex(/^\S*$/, { message: "ID should not contain spaces" }),
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
