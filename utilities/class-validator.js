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
            .trim()
            .custom(value => {
                const pattern = new RegExp("Block [A-Z] \- Room [0-9]|[0-9]{2}")
                if (!pattern.test(value)) {
                    throw new Error("Room must be in format 'Block y - Room x' where y is any capital letter and x is any number with 2 or less digits");
                }
            }),

        body('schedule')
            .notEmpty()
            .withMessage('Schedule is required')
            .custom(value => {
                const pattern = new RegExp("[A-Za-z{3}] [0-9|0-9{2}].[0-9{2}] \- [0-9|0-9{2}].[0-9{2}]")
                if (!pattern.test(value)) {
                    throw new Error("Room must be in format \"misc x:xx - x:xx\" ");
                }
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