const dbConfig = require("../db.config");
const bcrypt = require("bcrypt");
const {jwtgenerator}=require('../utils/jwtgen')

const registerCustomerDb=async (data)=>{
    const { email, password, firstName, lastName, address } =
        data;
        const query=`SELECT * FROM users WHERE email =$1`
        const user = await dbConfig.query(query, [email]);
        console.log(user.rows)
           //  check if user exists....
           if (user.rows.length !== 0) {
            return user=[];
          }
          //  bcryption---------------
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          const insertQuery=`INSERT  INTO  "users" ("email", "password", "firstName", "lastName", "address") VALUES ($1, $2, $3, $4, $5) RETURNING *`
          const result = await dbConfig.query(insertQuery,[email, hashedPassword, firstName, lastName, address]);
          //    res.json(result.rows[0]);
          //    tokenization................
          return result   
} 
const loginCustomerDb=async (data)=>{
    const { email } = data;

    const query=`SELECT * FROM users WHERE email = $1`
    const user = await dbConfig.query(query, [
        email,
      ]);
      if (user.rows.length === 0) {
        return []
      } 
      return user
    
}
const forgetPDb = async ({email,newpassword}) =>{

  const query=`SELECT * FROM users WHERE email = '${email}'`
  console.log(query);
    const user = await dbConfig.query(query);
if(user.rows===0){
  return []
}
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(newpassword, saltRounds);      
const update=`UPDATE users
SET password = $1
WHERE email = $2`
const result = await dbConfig.query(update, [ hashedPassword, email
])
 return result;
               
}


module.exports={registerCustomerDb,loginCustomerDb, forgetPDb }

// const registerCustomerDb = async (info) => {
//   try {
//     const { email, password, firstName, lastName, address } = info;
//     const query = `INSERT INTO "users"("email", "password", "firstName", "lastName", "address") 
//           VALUES($1, $2, $3, $4, $5) 
//           RETURNING*`;
//     const result = await dbConfig.query(query, [
//       email,
//       password,
//       firstName,
//       lastName,
//       address,
//     ]);
//     // console.log("Reg Db: ", result);
//     return result;
//   } catch (error) {
//     console.log("DB Catch Error: ", error);
//   }
// };

// const loginCustomerDb = async ({ email }) => {
//   try {
//     const query = `SELECT * FROM "users" where email = $1 LIMIT 1`;
//     // console.log("Inside Db");
//     const result = await dbConfig.query(query, [email]);
//     // console.log("Login DB: ", result);
//     return result;
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// module.exports = { registerCustomerDb, loginCustomerDb };
