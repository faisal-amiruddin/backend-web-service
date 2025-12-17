const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Web Service API',
      version: '1.0.0',
      description: 'API documentation for website development service backend',
      contact: {
        name: 'API Support',
        email: 'admin@example.com',
      },
    },
    servers: [
      {
        url: '/.netlify/functions/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path to route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;