const { application } = require("express");
const router = require("express").Router();
const {registerCustomer,loginCustomer}=require('../controllers/customerController')

//for register\
router.post("/register", registerCustomer)
  // for login
// router.post("/login", loginCustomer);

module.exports=router
  
  