const BaseModel = require("./baseModel");
const { ObjectId } = require("mongodb");

class StaffModel extends BaseModel {
  constructor() {
    super("staff");
  }

  // Custom updateById to override the once at baseModel
  async updateById(id, data) {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid update data");
    }

    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId format");
    }

    // Added updatedAt field
    data.updatedAt = new Date();

    const objectId = ObjectId.createFromHexString(id);
    const result = await this.collection.updateOne(
      { _id: objectId },
      { $set: data }
    );

    if (result.matchedCount === 0) {
      throw new Error("Document not found");
    }

    return result.modifiedCount > 0;
  }
}

module.exports = new StaffModel();
