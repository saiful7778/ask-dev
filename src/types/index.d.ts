import type { $Enums } from "@prisma/client";
import type { ZodIssue } from "zod";

export type ValidationError = {
  field: string;
  message: string;
};

export interface ServerResponseType<T> {
  success: boolean;
  message?: string | undefined;
  error?: string | undefined | ZodIssue[] | ValidationError[];
  data?: T | undefined;
  status?: number | undefined;
}

export type ApiResponseType<T> = {
  success: boolean;
  message?: string | undefined;
  error?: string | undefined | ZodIssue[] | ValidationError[];
  data?: T | undefined;
};

export type UserType = {
  email: string;
  name: string;
  image: string | null;
  id: string;
  role: $Enums.ROLE;
  emailVerified: Date | null;
  access: boolean;
  hashedPassword: string | null;
  saltValue: string | null;
  createdAt: Date;
  updatedAt: Date;
};
