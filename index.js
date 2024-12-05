import express from "express";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { connectDB } from "./src/config/database.js";
import task from "./src/routes/taskRoute.js";
import group from "./src/routes/groupRoute.js";

import login from "./src/routes/loginRoute.js";
import register from "./src/routes/registerUser.js";
import authMiddleware from "./src/middlewares/authMiddleware.js";
const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Hook API Documentation",
      version: "1.0.0",
      description: "API documentation for Task Hook Backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        JWT: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Add your JWT token in the format: Bearer <token>",
        },
      },
    },
    security: [
      {
        JWT: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerUiOptions = {
  swaggerOptions: {
    authAction: {
      JWT: {
        name: "JWT",
        schema: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "",
        },
        value: "Bearer <JWT>",
      },
    },
  },
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.get("/", (req, res) => res.send("Task Hook Backend Home Route"));
app.use("/api/tasks", authMiddleware, task);
app.use("/api/groups", authMiddleware, group);
app.use("/api/auth/login", login);
app.use("/api/auth/register", register);

app.listen(5000, async () => {
  await connectDB();
  console.log(`Port is running on the http://localhost:5000`);
  console.log(
    `Swagger documentation available at http://localhost:5000/api-docs`
  );
});

import dotenv from "dotenv";
dotenv.config();
