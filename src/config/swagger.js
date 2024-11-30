import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task-Hook API",
      version: "1.0.0",
      description: "API documentation for Task-Hook Backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Path to the API routes
};

export const specs = swaggerJsdoc(options);

/**
 * @swagger
 * /api/your-endpoint:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Your endpoint summary
 */
