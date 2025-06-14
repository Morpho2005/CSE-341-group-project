const { body, validationResult } = require('express-validator');
const degreeModel = require('../models/degreeModel');
const validate = {};

validate.classValidationRules = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('name is required')
            .isLength({min: 5})
            .withMessage('name must be at least 5 characters long')
            .trim(),
        
        body('durationYears')
            .notEmpty()
            .withMessage('durationYears is required')
            .isNumeric()
            .withMessage('durationYears must be a number')
            .trim(),
        
        body('department')
            .notEmpty()
            .withMessage('department is required')
            .trim(),

        body('accreditation')
            .notEmpty()
            .withMessage('accreditation is required')
            .isLength(3)
            .withMessage('accreditation must be three charactes long')

    ]
}

//Validate request
validate.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;