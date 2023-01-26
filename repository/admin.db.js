const pool = require("../db");



const getAllSellersDb = async () => {

  const getQuery = ` select * from "sellers" `;

  const allSellers= await pool.query( getQuery );

  return allSellers;

};



module.exports = { 

    getAllSellersDb
    
};