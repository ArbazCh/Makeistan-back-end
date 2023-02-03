const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.SECRET; 


const jwtgenerator = (customerId) =>{
const payload = {
    user : customerId
}
return jwt.sign(payload, secret,)
}

module.exports = {jwtgenerator};