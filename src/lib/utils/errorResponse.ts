import { AxiosError } from "axios";

export default function errorResponse<T>(
  err: unknown,
  callBack?: (data: T) => void,
): string {
  if (err instanceof AxiosError) {
    if (err?.response) {
      const status = err.response.status;
      const data = err.response.data;

      switch (status) {
        case 422:
          callBack?.(data?.error as T);
          return "Validation error";

        default:
          return typeof data?.error === "string"
            ? data?.error
            : "Something went wrong";
      }
    }
    if (err?.request) {
      return "Network error";
    }
    return "Something went wrong";
  }
  if (err instanceof Error) {
    return err.message || "Something went wrong";
  }
  return "Something went wrong";
}
