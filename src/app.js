import express from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger.js";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
