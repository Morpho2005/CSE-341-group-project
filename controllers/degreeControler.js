const BaseController = require('./baseController');
const degreeModel = require('../models/degreeModel');
class DegreeController extends BaseController {
  constructor() {
    super(degreeModel);
  }
}
module.exports = new DegreeController();