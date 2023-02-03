const jwt = require("jsonwebtoken");

require("dotenv").config();

function jwtGenerator(sellerId){

    const payload = {
        seller : {
            id: sellerId
        }
    };
    // const payload = {
    //     seller: sellerId
    // }
    return jwt.sign( payload, process.env.MY_SECRET, {expiresIn: "1hr"});
};

module.exports = jwtGenerator;