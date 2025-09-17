// const express = require("express"); //type:common.js
// import "../instrument.mjs";
import express from "express"; //type:module
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/injest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import * as Sentry from "@sentry/node";
import cors from "cors";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS for all routes
app.use(clerkMiddleware()); //req.auth will be available
app.get("/debug-sentry", (req, res) => {
  throw new Error("Debug first Sentry");
});
app.get("/", (req, res) => {
  res.send(`Slack Clone Backend PORT ${PORT}`);
});

app.use("/api/inngest", serve({ client: inngest, functions })); //handles ingest
app.use("/api/chat", chatRoutes); //handles stream
Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } //if we're in development run on port
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};
startServer();

export default app;
