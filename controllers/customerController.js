const {registerCustomerDb, loginCustomerDb}=require('../repository/customer.db')

const registerCustomer=async (req, res) => {
   
      // destructuring every data......
      const {  email, password, firstName, lastName, address } =
        req.body;
        try {
      const user = await registerCustomerDb({ email, password, firstName, lastName, address}) 
      // console.log(user)
      if (user) res.status(200).json({message: "User Added Successfully"})
  }catch(error){
    console.error(error.message);
    res.status(500).send("User Already Exist");
  }
}
  const loginCustomer= async (req, res) => {
    try {
      //destructuring required data
      const { email, password } = req.body;
      //checking user existance
      const user = await loginCustomerDb({ email, password })
    }catch(error){
    console.error(error.message);
    res.status(500).send("server error");
  }
}

  module.exports={registerCustomer,loginCustomer}