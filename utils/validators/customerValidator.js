const validator = require("validator");
const { encryptPassword } = require("../utils");
const {
  INVALID_REQUEST,
  AUTHORIZATION_FAILED,
} = require("../../constants/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerValidator = async (req, res, next) => {
  try {
    // console.log("Reg Valditaor");
    const { email, password, firstName, lastName, address } = req.body;
    if (
      typeof password === "string" &&
      typeof email === "string" &&
      typeof firstName === "string" &&
      typeof lastName === "string" &&
      email &&
      password &&
      firstName &&
      lastName &&
      address &&
      password.length >= 6
    ) {
      const isValidEmail = validator.isEmail(email);
      // console.log("IEmail Valid: ", isValidEmail);
      if (isValidEmail) {
        const encryptedPassword = await encryptPassword(password);
        req.body.password = encryptedPassword;
        next();
      } else {
        res.json(INVALID_REQUEST);
      }
    } else {
      res.json(INVALID_REQUEST);
    }
  } catch (err) {
    console.error(new Error("Catch Error in RegistorValidator"), err.message);
  }
};

const loginValidator = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isValidEmail = validator.isEmail(email);

    if (isValidEmail && typeof password === "string" && password) {
      next();
    } else {
      res.json(INVALID_REQUEST);
    }
  } catch (error) {
    res.json(CONTROLLER_ERROR);
  }
};

const customerAuthorize = async (req, res, next) => {
  // console.log("order Body: ", req.body);
  try {
    let token = req.headers.authorization;
    // console.log("Token: ", token);
    if (!token) return res.json(INVALID_REQUEST);
    const bearer = token.split(" ")[1];
    // console.log("Token", bearer);
    const user = jwt.verify(bearer, process.env.SECRET_KEY);
    console.log("user:", user);
    req.user = user;
    // console.log("user: ", user);
    next();
  } catch (err) {
    console.error(new Error("auth catch error: "), err.message);
    return res.status(AUTHORIZATION_FAILED.status).json({
      message: AUTHORIZATION_FAILED.message,
      status: AUTHORIZATION_FAILED.status,
    });
  }
};

const orderValidator = async (req, res, next) => {
  console.log(req.body);
  try {
    const { paymentId, productId, sellerId, orderNumber, quantity } = req.body;
    if (paymentId && productId && sellerId && orderNumber && quantity >= 1)
      return next();
    else {
      return res.status(INVALID_REQUEST.status).json(INVALID_REQUEST.message);
    }
  } catch (err) {
    res.status(INVALID_REQUEST.status).json(INVALID_REQUEST.message);
    console.error(new Error(" catch error orderValidator: ", err.message));
  }
};

module.exports = {
  registerValidator,
  loginValidator,
  customerAuthorize,
  orderValidator,
};
