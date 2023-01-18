
const validator = require("validator");
const { encryptPassword } = require("../utils");
const loginValidator = async (req, res, next) => {
    try {
      const { loginId, password } = req.body;
      const isValidloginId = validator.isloginId(loginId);
  
      if (isValidloginId && typeof password === "string" && password) {
        next();
      } else {
        res.json(INVALID_REQUEST);
      }
    } catch (error) {
      res.json(CONTROLLER_ERROR);
    }
  };
  
  module.exports = { loginValidator };
  