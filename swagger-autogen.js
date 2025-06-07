const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-doc/swagger_output.json";
const endpointsFiles = ["./routes/studentRoute", "./routes/staffRoute"];

const path = require("path");

const fs = require("fs");
const schemasDir = path.join(__dirname, "swagger-doc", "schemas");
const schemaFiles = fs
  .readdirSync(schemasDir)
  .filter((file) => file.endsWith(".js"));

const schemas = {};
schemaFiles.forEach((file) => {
  const schemaName = file.replace(".js", "");
  schemas[schemaName] = require(path.join(schemasDir, file));
});

const config = {
  info: {
    title: "School management API",
    description: "API for school admin storage and Management",
  },
  host: "localhost:5500",
  schemes: ["http"],
  components: {
    schemas: schemas,
  },
};

swaggerAutogen(outputFile, endpointsFiles, config);
