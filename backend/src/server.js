// const express = require("express"); //type:common.js
import express from "express"; //type:module
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/injest.js";
import { serve } from "inngest/express";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(clerkMiddleware()); //req.auth will be available

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send(`Slack Clone Backend PORT ${PORT}`);
});

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
