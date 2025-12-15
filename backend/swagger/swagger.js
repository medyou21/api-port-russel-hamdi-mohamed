// backend/swagger/swagger.js
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Port Russell",
      version: "1.0.0",
      description: "Documentation de l'API pour utilisateurs, catways et réservations",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../routes/*.js"),    // tous les fichiers routes
    path.join(__dirname, "../views/**/*.ejs"), // tous les fichiers EJS avec JSDoc/Swagger
  ],
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;
