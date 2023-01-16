const validator = require("validator");
const { encryptPassword } = require("../utils");
const { INVALID_REQUEST } = require("../../constants/error");
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

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    // console.log(token);
    if (!token) return res.json(INVALID_REQUEST);
    const bearer = token.split(" ")[1];
    const user = jwt.verify(bearer, process.env.SECRET_KEY);
    // console.log("user:", user, "Bearer: ", bearer);
    req.user = user;
    next();
  } catch (err) {
    res.status(INVALID_REQUEST.status).json(INVALID_REQUEST.message);
    console.error(new Error("auth catch error: "), err.message);
  }
};

module.exports = { registerValidator, loginValidator, auth };
