import { PrismaClient } from "@prisma/client";

const globalForDB = globalThis as unknown as { db: PrismaClient };

const db = globalForDB.db || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForDB.db = db;

export default db;
