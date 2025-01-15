import { ServerError } from "@/lib/helpers/ServerError";

export async function getJsonBodyData<T>(req: Request): Promise<T | null> {
  try {
    return req.json() as T | null;
  } catch {
    throw new ServerError("JSON Payload is required", "BodyError");
  }
}

export async function getFormData<T>(req: Request): Promise<T | null> {
  try {
    return req.formData() as T | null;
  } catch {
    throw new ServerError("FORM Payload is required", "BodyError");
  }
}

export async function getRawBody(req: Request): Promise<string> {
  try {
    return req.text();
  } catch {
    throw new ServerError("TEXT Payload is required", "BodyError");
  }
}
