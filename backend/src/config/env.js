import dotenv from "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  STREAM_API: process.env.STREAM_API,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
  SENTRY_DSN: process.env.SENTRY_DSN,
  INGEST_EVENT_KEY: process.env.INGEST_EVENT_KEY,
  INGEST_SIGNING_KEY: process.env.INGEST_SIGNING_KEY,
  CLIENT_URL: process.env.CLIENT_URL,
};
