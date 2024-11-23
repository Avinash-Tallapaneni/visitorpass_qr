import { config } from "dotenv";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

config({ path: envFile });

const serverConfig = {
  port: process.env.PORT ?? 8000,
};

export default serverConfig;
