import crypto from "node:crypto";

export function createToken(payload: unknown): string {
  const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
  const base64Header = Buffer.from(header).toString("base64url");

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );

  const data = `${base64Header}.${base64Payload}`;

  const signature = crypto
    .createHmac("sha256", process.env.TOKEN_SECRET_KEY!)
    .update(data)
    .digest("base64url");

  return `${data}.${signature}`;
}

export function verifyToken<T>(token: string): Promise<T> {
  const [header, payload, signature] = token.split(".");

  const data = `${header}.${payload}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.TOKEN_SECRET_KEY!)
    .update(data)
    .digest("base64url");

  return new Promise<T>((resolve, reject) => {
    if (expectedSignature === signature) {
      resolve(JSON.parse(Buffer.from(payload, "base64url").toString()) as T);
    } else {
      reject(new Error("Invalid token"));
    }
  });
}
