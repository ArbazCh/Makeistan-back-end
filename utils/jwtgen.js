const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET_KEY;

const jwtgenerator = (id, email) => {
  const payload = {
    id,
    email,
  };
  return jwt.sign(payload, secret);
};

module.exports = { jwtgenerator };
