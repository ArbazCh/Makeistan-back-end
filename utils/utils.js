const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


const encryptPassword = async (password) => {

  const encryptedPassword = await bcrypt.hash(password, 10);

  // console.log("actual Hash Password: ", encryptedPassword);
  return encryptedPassword;
};

const jwtGenerator=(admin_id) =>{
  const payload ={
      admin: admin_id
  };
  return jwt.sign(payload,process.env.SECRET_KEY, {expiresIn: "1hr"});
}

module.exports = { encryptPassword,jwtGenerator };
