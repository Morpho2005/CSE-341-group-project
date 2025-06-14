const { body, validationResult } = require('express-validator');
const classModel = require('../models/classModel');
const validate = {};

validate.classValidationRules = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .isLength({min: 10})
            .withMessage('title must be at least 10 characters long')
            .trim(),
        
        body('code')
            .notEmpty()
            .withMessage('Code is required')
            .isLength(6)
            .withMessage('Code must be exactly 6 characters long')
            .trim(),
        
        body('room')
            .notEmpty()
            .withMessage('Room is required')
            .trim(),

        body('schedule')
            .notEmpty()
            .withMessage('Schedule is required')
            .custom(value => {
                const pattern = /Block [A-Z] \- Room [0-9]|[0-9]{2}/
            })

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