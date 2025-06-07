const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");

router.get("/", staffController.getAll);
router.get("/:id", staffController.getById);
router.post("/", staffController.createStaff);
router.put("/", staffController.deleteById);
router.delete("/:id", staffController.deleteById);

module.exports = router;
