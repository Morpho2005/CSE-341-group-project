const router = require("express").Router();
const studentsRoute = require("./studentRoute");
const staffRoute = require("./staffRoute");

router.get("/", (req, res) => {
  res.send("Welcome to the School Management Api");
});

router.use("/students", studentsRoute);
router.use("/staff", staffRoute);

module.exports = router;
