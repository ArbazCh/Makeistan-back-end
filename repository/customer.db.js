const dbConfig = require("../db.config");

const registerCustomerDb = async (req) => {
  try {
    const { email, password, firstName, lastName, address } = req.body;
    const query = `INSERT INTO "users"("email", "password", "firstName", "lastName", "address") 
          VALUES($1, $2, $3, $4, $5) 
          RETURNING*`;
    const result = await dbConfig.query(query, [
      email,
      password,
      firstName,
      lastName,
      address,
    ]);
    // console.log("Reg Db: ", result);
    if (result.rows === 0) return [];
    return result;
  } catch (error) {
    console.log("DB Catch Error: ", error);
  }
};

const loginCustomerDb = async (req) => {
  const { email } = req.body;
  try {
    const query = `SELECT * FROM "users" where email = $1 LIMIT 1`;
    // console.log("Inside Db");
    const result = await dbConfig.query(query, [email]);
    // console.log("Login DB: ", result);
    if (result.rows === 0) return [];
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { registerCustomerDb, loginCustomerDb };
