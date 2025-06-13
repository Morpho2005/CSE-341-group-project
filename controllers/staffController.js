const BaseController = require('./baseController');
const staffModel = require('../models/staffModel');
class StaffController extends BaseController {
  constructor() {
    super(staffModel);
  }
}
module.exports = new StaffController();
