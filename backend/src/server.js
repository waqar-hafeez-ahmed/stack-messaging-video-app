// const express = require("express"); //type:common.js
import express from "express"; //type:module
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
const app = express();
const PORT = ENV.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Slack Clone Backend PORT ${PORT}`);
});

app.listen(PORT, () => {
  connectDB();
});
