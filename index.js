import express from "express";
import bodyParser from "body-parser";

import { connectDB } from "./src/config/database.js";
import task from "./src/routes/taskRoute.js";
import group from "./src/routes/groupRoute.js";
import userRegistration from "./src/routes/registerUser.js";
import loginRoute from "./src/routes/loginRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", loginRoute);

app.get("/", (req, res) => res.send("Task Hook Backend Home Route"));

app.use("/api/tasks", task);
app.use("/api/groups", group);
app.use("/api/auth", userRegistration);
app.listen(5000, async () => {
  await connectDB();
  console.log(`Port is running on the http://localhost:5000`);
});

import dotenv from "dotenv";
dotenv.config();
