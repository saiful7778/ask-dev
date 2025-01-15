import type { NextResponse } from "next/server";
import type { ServerResponseType } from "@/types";
import serverResponse from "./serverResponse";

class BodyError extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
  }
}

export async function getJsonBodyData<T>(req: Request): Promise<T | null> {
  try {
    return req.json() as T | null;
  } catch {
    throw new BodyError("JSON Payload is required", "BodyError");
  }
}

export async function getFormData<T>(req: Request): Promise<T | null> {
  try {
    return req.formData() as T | null;
  } catch {
    throw new BodyError("FORM Payload is required", "BodyError");
  }
}

export async function getRawBody(req: Request): Promise<string> {
  try {
    return req.text();
  } catch {
    throw new BodyError("TEXT Payload is required", "BodyError");
  }
}

export function sendBodyError(): NextResponse<ServerResponseType<unknown>> {
  return serverResponse({
    success: false,
    error: "JSON Payload is required",
    status: 400, // Bad Request
  });
}
