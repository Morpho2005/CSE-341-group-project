const { ObjectId } = require("mongodb");

function uniqueEmailValidator(model) {
  return async (value, { req }) => {
    const filter = { email: value };

    // For update: exclude current document's ID
    if (req.method === "PUT") {
      if (!req.params.id) throw new Error("Missing document ID for update");
      filter._id = { $ne: ObjectId.createFromHexString(req.params.id) };
    }

    const exists = await model.exists(filter);
    if (exists) throw new Error("Email already in use");
  };
}

module.exports = { uniqueEmailValidator };
