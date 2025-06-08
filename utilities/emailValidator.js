const { ObjectId } = require("mongodb");

function uniqueEmailValidator(model) {
  return async (value, { req }) => {
    if (!req.params.id) throw new Error("Missing document ID");

    const filter = {
      email: value,
      _id: { $ne: ObjectId.createFromHexString(req.params.id) },
    };

    const exists = await model.exists(filter);
    if (exists) throw new Error("Email already in use");
  };
}

module.exports = { uniqueEmailValidator };
