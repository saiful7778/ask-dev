import type { NextResponse } from "next/server";
import serverResponse from "@/lib/utils/serverResponse";
import type { ServerResponseType } from "@/types";
import { ZodError } from "zod";
import validationErrors from "./validationErrors";

export default async function serverAsyncResolve<T>(
  asyncCallback: () => Promise<NextResponse<ServerResponseType<T>>>,
): Promise<NextResponse<ServerResponseType<T>>> {
  try {
    return await asyncCallback();
  } catch (err) {
    if (err instanceof ZodError) {
      return serverResponse({
        success: false,
        error: validationErrors(err),
        status: 422,
      });
    }
    if (err instanceof Error) {
      return serverResponse({
        success: false,
        error: err.message,
        status: 500,
      });
    }
    return serverResponse({
      success: false,
      error: "Something went wrong",
      status: 500,
    });
  }
}
