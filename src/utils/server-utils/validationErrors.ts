import type { ValidationError } from "@/types";
import type { ZodError } from "zod";

export default function validationErrors(error: ZodError): ValidationError[] {
  return error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
}
