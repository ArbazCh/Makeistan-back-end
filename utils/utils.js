var bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  // console.log("Bcypt utils");
  const encryptedPassword = await bcrypt.hash(password, 10);
  // console.log("Hash Password: ", encryptedPassword);
  return encryptedPassword;
};

module.exports = { encryptPassword };
