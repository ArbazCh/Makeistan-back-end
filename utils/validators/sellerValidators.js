const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");

const { API_STATUS_CODES, RESPONSE_MESSAGES } = require('../../constants/constant');

const { AUTHORIZATION_FAILED } = require("../../constants/error");

require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

const authorize = (req, res, next) => {
    // Get token from header
    const token = req.header("token");
  
    // Check if not token
    if (!token) {
      return res.status(API_STATUS_CODES.AUTHORIZATION_FAILED).json(AUTHORIZATION_FAILED.message);
    }
  
    // Verify token
    try {
      //it is going to give use the seller id (seller{Id: seller.id})
      const verify = jwt.verify(token, process.env.MY_SECRET);
  
      req.seller = verify.seller;
  
      next();
    } catch (err) {
      res.status(API_STATUS_CODES.AUTHORIZATION_FAILED).json({ msg: "Token is not valid" });
    }
  };
  
// Seller Inputs Validations

const validations = [
    
    body('email').isEmail(),
    body('profilePicture').notEmpty().withMessage("image is required"), 
    body('fullName').notEmpty().withMessage("Input is required"),

    body('CNIC').notEmpty().withMessage("Input is required")
    .bail()
    .isLength({ min: 13, max:13}).withMessage("length should be 13"),

    body('mobileNumber').notEmpty().withMessage("Input is required")
    .bail()
    .isLength({ min: 11, max:11}).withMessage("length should be 11"),

    body('address').notEmpty().withMessage("Input required")
    .bail()
    .isLength({ min: 5, max:200}).withMessage("length should be min 5 and max 200"),

    body('shopName').notEmpty().withMessage("Input is required")
    .bail()
    .isLength({ min: 5, max:80}).withMessage("length should be min 5 and max 80"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

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
    .isInt().withMessage("Please enter an integer value"),

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

module.exports = { validations, productValidations, authorize};