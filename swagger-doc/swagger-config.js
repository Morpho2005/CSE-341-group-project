const swaggerDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const studentSchema = require("./schemas/studentSchema");
const staffSchema = require("./schemas/staffSchema");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School management API",
      version: "1.0.0",
      description: "API for school admin storage and Management",
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
  apis: ["./routes/*.js"], // Path to the API docs
};
const specs = swaggerDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.get("/api-docs.json", (req, res) => {
    res.json(specs);
  });
};
