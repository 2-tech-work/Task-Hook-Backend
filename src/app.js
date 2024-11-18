const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();

// CORS middleware
app.use(cors());
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management API',
            version: '1.0.0',
            description: 'Task Management API documentation'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Task Management API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            tasks: '/api/tasks',
            groups: '/api/groups'
        }
    });
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/groups', groupRoutes);
module.exports = app;