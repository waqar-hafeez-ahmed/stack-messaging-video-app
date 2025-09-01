// const express = require("express"); //type:common.js
import "../instrument.mjs";
import express from "express"; //type:module
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/injest.js";
import chatRoutes from "./routes/chat.route.js";
import { serve } from "inngest/express";
import cors from "cors";
import * as Sentry from "@sentry/node";

const app = express();
app.use(express.json());
// const PORT = ENV.PORT;

app.use(clerkMiddleware()); //req.auth will be available
app.get("/debug-sentry", (req, res) => {
  throw new Error("Debug first Sentry");
});

app.get("/", (req, res) => {
  res.send("Hello World! 123");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server started on port:", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

export default app;
