const validator = require("validator");
const { encryptPassword } = require("../utils");
const INVALID_REQUEST = require("../../constants/error");

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

module.exports = { registerValidator, loginValidator };
