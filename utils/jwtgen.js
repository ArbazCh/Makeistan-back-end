const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.SECRET; 


const jwtgenerator = (customerId) =>{
const payload = {
    user : customerId
}
return jwt.sign(payload, secret, {expiresIn : "1hr"})
}

module.exports = {jwtgenerator};