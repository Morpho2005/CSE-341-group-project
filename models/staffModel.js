const BaseModel = require("./baseModel");

class StaffModel extends BaseModel {
  constructor() {
    super("staff");
  }
}
module.exports = new StaffModel();
