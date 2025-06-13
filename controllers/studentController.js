const BaseController = require("./baseController");
const studentModel = require("../models/studentModel");

class StudentController extends BaseController {
  constructor() {
    super(studentModel);
  }

  // Additional methods specific to StudentController can be added here
}
module.exports = new StudentController();
