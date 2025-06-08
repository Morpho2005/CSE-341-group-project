const { body, validationResult } = require("express-validator");
const staffModel = require("../models/staffModel");
const { uniqueEmailValidator } = require("../utilities/emailValidator");
const validate = {};

validate.staffValidationRules = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long.")
      .trim(),

    body("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long.")
      .trim(),

    body("gender")
      .optional()
      .isIn(["male", "female"])
      .withMessage("Gender must be 'male', 'female'"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email address is required.")
      .isEmail()
      .withMessage("A valid email address is required.")
      .custom(uniqueEmailValidator(staffModel))
      .normalizeEmail(),

    body("phone")
      .optional()
      .isMobilePhone("any")
      .withMessage("Invalid phone number"),

    body("hireDate")
      .optional()
      .isISO8601()
      .withMessage("Hire date must be a valid ISO 8601 date"),

    body("address")
      .optional()
      .isObject()
      .withMessage("Address must be a object"),

    body("qualification")
      .optional()
      .isString()
      .withMessage("Qualification must be a string"),

    body("status")
      .optional()
      .isIn(["active", "inactive", "suspended", "retired"])
      .withMessage("Invalid status value"),
  ];
};
//Validate request
validate.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
