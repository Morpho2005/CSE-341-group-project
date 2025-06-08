//Require env
require("dotenv").config();

// Importing required modules
const express = require("express");
//Express app initialization
const app = express();
const routes = require("./routes");
const { connectDB } = require("./data/database");
const setupSwagger = require("./swagger");
const cors = require("cors");
const errorMiddleware = require("./middleware/errorMiddleware");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api", routes);

// Swagger documentation and error middleware
setupSwagger(app);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

//Start server
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(
        `Swagger documentation is available at http://localhost:${PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}
startServer();
