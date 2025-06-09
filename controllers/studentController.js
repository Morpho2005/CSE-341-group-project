const { ObjectId } = require("mongodb");
const BaseController = require("./baseController");
const studentModel = require("../models/studentModel");

class StudentController extends BaseController {
  constructor() {
    super(studentModel);
  }

  toObjectIds(ids) {
    if (!Array.isArray(ids)) return [];
    return ids
      .filter((id) => ObjectId.isValid(id))
      .map((id) => ObjectId.createFromHexString(id));
  }

  // Custom method to create a student
  createStudent = async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth,
        classId,
        degreeId,
        address,
        enrollmentDate,
        status,
      } = req.body;

      const newStudent = {
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        classId: this.toObjectIds([classId])[0] || null,
        degreeId: degreeId ? this.toObjectIds([degreeId])[0] : null,
        address,
        enrollmentDate: new Date(enrollmentDate),
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdStudent = await this.model.create(newStudent);
      if (!createdStudent) {
        res.status(400);
        throw new Error("Failed to create student");
      }

      res.status(201).json(createdStudent);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new StudentController();
