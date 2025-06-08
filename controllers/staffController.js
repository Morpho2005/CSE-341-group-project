const { ObjectId } = require("mongodb");
const BaseController = require("./baseController");
const staffModel = require("../models/staffModel");

class StaffController extends BaseController {
  constructor() {
    super(staffModel);
  }

  toObjectIds(ids) {
    if (!Array.isArray(ids)) return [];
    return ids
      .filter((id) => ObjectId.isValid(id))
      .map((id) => ObjectId.createFromHexString(id));
  }

  createStaff = async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        gender,
        email,
        phone,
        subjects,
        classIds,
        hireDate,
        address,
        qualification,
        status,
      } = req.body;

      const newStaff = {
        firstName,
        lastName,
        gender,
        email,
        phone,
        subjects: this.toObjectIds(subjects),
        classIds: this.toObjectIds(classIds),
        hireDate: hireDate ? new Date(hireDate) : new Date(),
        address,
        qualification,
        status: status || "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdStaff = await this.model.create(newStaff);
      res.status(201).json({
        status: "Staff has been created",
        data: createdStaff,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new StaffController();
