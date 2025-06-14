const router = require("express").Router();
const studentsRoute = require("./studentRoute");
const staffRoute = require("./staffRoute");
const classRoute = require("./classRoute")
const degreeRoute = require("./degreeRoute")

router.get("/", (req, res) => {
  res.send("Welcome to the School Management Api");
});

router.use("/students", studentsRoute);
router.use("/staff", staffRoute);
router.use("/class", classRoute);
router.use("/degree", degreeRoute);

module.exports = router;
