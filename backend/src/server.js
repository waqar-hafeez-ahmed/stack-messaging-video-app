// const express = require("express"); //type:common.js
import express from "express"; //type:module
import { ENV } from "./config/env.js";
const app = express();
const PORT = ENV.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Slack Clone Backend 444");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
