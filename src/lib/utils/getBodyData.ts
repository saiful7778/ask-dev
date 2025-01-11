import type { NextResponse } from "next/server";
import serverResponse from "./serverResponse";
import type { ServerResponseType } from "@/types";

export async function getJsonBodyData<T>(req: Request): Promise<T | null> {
  return (await req.json().catch(() => null)) as T | null;
}

export async function getFormData<T>(req: Request): Promise<T | null> {
  return (await req.formData().catch(() => null)) as T | null;
}

export async function getRawBody(req: Request): Promise<string | null> {
  return await req.text().catch(() => null);
}

export function sendBodyError(): NextResponse<ServerResponseType<unknown>> {
  return serverResponse({
    success: false,
    error: "JSON Payload is required",
    status: 400, // Bad Request
  });
}
