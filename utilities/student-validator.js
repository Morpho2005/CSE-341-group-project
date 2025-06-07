const { body, validationResult } = require("express-validator");
const studentModel = require("../models/studentModel");
const validate = {};

validate.studentValidationRules = () => {
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

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email address is required.")
      .isEmail()
      .withMessage("A valid email address is required.")
      .custom(async (value) => {
        const exists = await studentModel.exists({ email: value });
        if (exists) {
          return Promise.reject("Email already in use");
        }
      })
      .normalizeEmail(),

    body("gender")
      .optional()
      .isIn(["male", "female"])
      .withMessage("Gender must be 'male', 'female'"),

    body("phone")
      .optional()
      .isMobilePhone("any")
      .withMessage("Invalid phone number"),

    body("dateOfBirth")
      .notEmpty()
      .withMessage("Date of birth is required")
      .isISO8601()
      .withMessage("Date of birth must be a valid ISO 8601 date"),

    body("enrollmentDate")
      .optional()
      .isISO8601()
      .withMessage("Enrollment date must be a valid ISO 8601 date"),

    body("status")
      .optional()
      .isIn(["active", "inactive", "graduated", "suspended"])
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
