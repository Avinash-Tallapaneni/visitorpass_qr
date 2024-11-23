import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

config({ path: envFile });

if (!process.env.DATABASE_URL) {
  throw new Error(`DATABASE_URL not found in ${envFile}`);
}

export default defineConfig({
  out: "./drizzle",
  schema: "./src/database/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
