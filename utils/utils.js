var bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {

    const encryptedPassword = await bcrypt.hash(password, 10);

    return encryptedPassword;
};
module.exports = { encryptPassword };