import * as z from "zod";
import { POST_DESCRIPTION_SIZE, POST_TITLE_SIZE } from "../staticData";

export const postSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required")
    .max(POST_TITLE_SIZE, "Title is too long"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description is required")
    .max(POST_DESCRIPTION_SIZE, "Description is too long"),
});

export type PostSchemaType = z.infer<typeof postSchema>;
