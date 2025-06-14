const BaseController = require('./baseController');
const classModel = require('../models/classModel');
class ClassController extends BaseController {
  constructor() {
    super(classModel);
  }
}
module.exports = new ClassController();