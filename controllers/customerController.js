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
const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constant");
const { CONTROLLER_ERROR, INVALID_REQUEST } = require("../constants/error");
const {
  getAllOrderDb,
  getOrderByIdDb,
  creatOrderDb,
  cancelOrderDb,
} = require("../repository/order.db");
const {
  registerCustomerDb,
  loginCustomerDb,
} = require("../repository/customer.db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getAllOrders = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await getAllOrderDb({ id });
    orders
      ? res.json({
          status: API_STATUS_CODES.SUCCESS,
          message: RESPONSE_MESSAGES.SUCCESS,
          body: orders.rows,
        })
      : res.json(INVALID_REQUEST);
  } catch (err) {
    console.error(err);
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const { id } = req.user;
  // console.log(req.user, id);
  try {
    const orderById = await getOrderByIdDb({ orderId, id });
    orderById.rows.length
      ? res.json({
          status: API_STATUS_CODES.SUCCESS,
          message: RESPONSE_MESSAGES.SUCCESS,
          body: orderById.rows,
        })
      : res.json({ INVALID_REQUEST });
  } catch (err) {
    console.error(
      new Error("User controller: Get order By Id Error"),
      err.message
    );
  }
};

const createOrder = async (req, res) => {
  const { id } = req.user; //customerId
  // console.log(id);
  const {
    productId,
    quantity,
    paymentId,
    date,
    time,
    orderStatus,
    sellerId,
    orderNumber,
  } = req.body;
  try {
    const createOrder = await creatOrderDb({
      id,
      productId,
      quantity,
      paymentId,
      date,
      time,
      orderStatus,
      sellerId,
      orderNumber,
    });
    createOrder
      ? res.json({
          status: API_STATUS_CODES.SUCCESS,
          message: RESPONSE_MESSAGES.ORDER_CREATED,
          body: createOrder,
        })
      : res.json({
          status: CONTROLLER_ERROR.status,
          message: CONTROLLER_ERROR.message,
        });
  } catch (err) {
    console.error(
      new Error("Customer controller: Create Order Error"),
      err.message
    );
  }
};

const cancelOrder = async (req, res) => {
  const { id } = req.user;
  const { orderId } = req.params;
  // console.log(id, orderId);
  try {
    const cancelOrder = await cancelOrderDb({ id, orderId });
    cancelOrder.rows.length
      ? res.json({
          status: API_STATUS_CODES.SUCCESS,
          message: RESPONSE_MESSAGES.ORDER_CANCLLED,
        })
      : res.json({ CONTROLLER_ERROR });
  } catch (err) {
    console.error(
      new Error("User controller: Cancel Order Error"),
      err.message
    );
  }
  // console.log("Hello1", cancelOrder);
};

// const registerCustomer = async (req, res) => {
//   try {
//     // console.log("In reg customer", registerCustomer);
//     const { email, password, firstName, lastName, address } = req.body;
//     const createdUser = await registerCustomerDb({
//       email,
//       password,
//       firstName,
//       lastName,
//       address,
//     });
//     // console.log("Register Controller: ", createdUser);
//     createdUser
//       ? res.json({
//           status: API_STATUS_CODES.SUCCESS,
//           message: RESPONSE_MESSAGES.SUCCESS,
//           body: createdUser,
//         })
//       : res.json(CONTROLLER_ERROR);
//   } catch (error) {
//     if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
//       return res.json({
//         status: API_STATUS_CODES.ERROR_CODE,
//         message: RESPONSE_MESSAGES.DUPLICATE_ENTRY,
//       });
//     }
//     console.log("Catch Error: ", error);
//   }
// };
// const loginCustomer = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     /**
//      * ? Existing User Check
//      */

//     const verifyUser = await loginCustomerDb({ email });
//     // console.log("Inside try login controller verifyUser: ", verifyUser.rows[0]);
//     if (verifyUser.rows.length < 1) {
//       return res.json({ INVALID_REQUEST });
//     }
//     /**
//      * Compare entered Password with hashed password in the db
//      */
//     const matchPassword = await bcrypt.compare(
//       password,
//       verifyUser.rows[0].password
//     );
//     // console.log("Matched Password : ", matchPassword);
//     if (!matchPassword) {
//       return res.json({ INVALID_REQUEST });
//     }
//     /**
//      * Return JWT Token
//      */
//     const token = await jwt.sign(
//       {
//         id: verifyUser.rows[0].customerId,
//         email: verifyUser.rows[0].email,
//       },
//       process.env.SECRET_KEY
//     );
//     res.json({
//       status: API_STATUS_CODES.CREATED,
//       user: {
//         id: verifyUser.rows[0].customerId,
//         email: verifyUser.rows[0].email,
//       },
//       token: token,
//       message: RESPONSE_MESSAGES.SUCCESS,
//     });
//   } catch (error) {
//     console.log("Login Controller Catch Error: ", error);
//   }
// };

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  registerCustomer,
  loginCustomer,
};
