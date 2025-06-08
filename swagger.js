// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

// Load custom schemas
const studentSchema = require("./swagger/schemas/studentSchema");
const staffSchema = require("./swagger/schemas/staffSchema");

// Swagger definition setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management API",
      version: "1.0.0",
      description: "API for school admin storage and management",
    },
    servers: [
      {
        url: "https://cse-341-group-project-mfvd.onrender.com/api",
      },
    ],
    components: {
      schemas: {
        student: studentSchema,
        staff: staffSchema,
      },
    },
  },
  apis: ["./routes/*.js"],
};

// Generate the OpenAPI spec
const specs = swaggerJsdoc(options);

// Save as YAML
const yamlOutputPath = path.join(__dirname, "swagger", "swagger-output.yaml");
fs.writeFileSync(yamlOutputPath, yaml.dump(specs));

// Export for use in Express
module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  // serve raw JSON and YAML
  app.get("/api-docs.json", (req, res) => res.json(specs));
  app.get("/api-docs.yaml", (req, res) => {
    res.setHeader("Content-Type", "application/x-yaml");
    res.sendFile(yamlOutputPath);
  });
};
