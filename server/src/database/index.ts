import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

config({ path: envFile });

if (!process.env.DATABASE_URL) {
  throw new Error(`DATABASE_URL not found in ${envFile}`);
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema: schema });
