const BaseModel = require("./baseModel");

class StudentModel extends BaseModel {
  constructor() {
    super("students");
  }

  async create(studentData) {
    try {
      return await super.create(studentData);
    } catch (error) {
      console.error("Student creation error:", error);
      throw error;
    }
  }

  async getByEmail(email) {
    return await this.getByField("email", email);
  }
}

module.exports = new StudentModel();
