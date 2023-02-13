const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = async(req,res,next)=>{
    try {
      const jwtToken = req.header("token");
      if(!jwtToken){
        return res.status(403).json("Not Authorize");
      }

      const payload = jwt.verify(jwtToken,process.env.SECRET_KEY);

      req.admin = payload.admin;
        
    } catch (err) {
      console.error(err.message);
      return res.status(403).json("Not Authorize") ; 
    }
};

