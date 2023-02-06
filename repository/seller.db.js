const dbConfig = require("../db.config");

const signUpDB = async({ profilePicture, email, fullName, CNIC,
  mobileNumber, address, shopName, cnicPicture, hashPassword }) => {

  const signUpQuery = 
  
  `INSERT INTO "sellers" ("profilePicture","email", "fullName", "CNIC", 
  "mobileNumber", "address", "shopName",  "cnicPicture", "password")
  values ( $1, $2, $3, $4, $5, $6, $7, $8,$9) Returning *`;

  const signUp = await pool.query( 
    signUpQuery,
    [
    profilePicture, email, fullName, CNIC,
    mobileNumber, address, shopName, cnicPicture, hashPassword
  ]
  );

  return signUp;

};

//revisit
const isEmailDB = async ({email}) =>{

  const emailQuery = `SELECT * FROM "sellers" WHERE email = $1`;

  const isEmailFound = await pool.query( emailQuery, [email] );

  return isEmailFound;
}

const getAllSellersDb = async () => {

  const getQuery = ` select * from "sellers" `;

  const allSellers= await pool.query( getQuery );

  return allSellers;

};
const getSellerByIdDB = async ({sId}) =>{

  const query = `select * from "sellers" where "sellerId" = $1 `;
  
  const getByID = await pool.query( query, [sId]);

  return getByID;

}




module.exports = { 
    signUpDB,
    isEmailDB,
    getAllSellersDb,
    getSellerByIdDB
  };