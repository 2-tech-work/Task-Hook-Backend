import express from "express";
import bodyParser from "body-parser";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { connectDB } from "./src/config/database.js";

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello From backend");
});

app.listen(5000, () => {
  console.log(`Port is running on the http://localhost:5000`);
});
