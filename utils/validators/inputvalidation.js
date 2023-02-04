const { body, validationResult } = require('express-validator');

// Products Input validations

const productValidations = [

    body('name').notEmpty().withMessage("Input is required")
    .bail()
    .isLength({min: 4 , max : 50}).withMessage("length should be min 4 and max 50"),

    body('description').notEmpty().withMessage("Input is required")
    .bail()
    .isLength({min: 4 , max : 200}).withMessage("length should be min 4 and max 200"),

    body('image').notEmpty().withMessage("Input is required"),

    body('stockQuantity').notEmpty().withMessage("Input is required")
    .bail()
    .isInt().withMessage("Please enter a integer value"),

    body('weight').notEmpty().withMessage("Input is required")
    .bail()
    .isInt().withMessage("Please enter a integer value"),

    body('unitPrice').notEmpty().withMessage("Input is required")
    .bail()
    .isInt().withMessage("Please enter a integer value"),
   
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = productValidations;