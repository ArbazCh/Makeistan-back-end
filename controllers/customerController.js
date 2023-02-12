const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const logger = require("../utils/logger");
const { jwtgenerator } = require("../utils/jwtgen");
const {
  registerCustomerDb,
  loginCustomerDb,
  forgetPDb,
} = require("../repository/customer.db");
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

const registerCustomer = async (req, res) => {
  console.log("BE Req", req.body);

  const body = req.body;
  try {
    const user = await registerCustomerDb(body);
    // console.log("user: ", user);
    if (user) res.status(200).json({ message: "User Added Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("User Already Exist");
  }
};
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req: ", req.body);
    //checking user existance
    const user = await loginCustomerDb({ email, password });
    if (user) {
      const hashedPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      // console.log(hashedPassword);
      if (!hashedPassword) {
        return res
          .status(401)
          .json({ message: "Password is incorrect", status: 401 });
      }
      //  jwt token
      const token = jwtgenerator(user.rows[0].customerId, email);
      res.json({
        jwtToken: token,
        user: user.rows,
        message: "user added successfully",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};
const forgetP = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    //checking if user exists
    const user = await forgetPDb({ email, newpassword });

    if (user) {
      return res.json({ message: "Password Updated" });
    } else {
      return res.status(500).send("email not found");
    }
    //  if(user){
    //   res.json("password updated")
    //  }
    //  res.json("user does not exist")
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrderDb(req);
    orders
      ? res.status(API_STATUS_CODES.SUCCESS).json({
          message: RESPONSE_MESSAGES.SUCCESS,
          body: orders.rows,
        })
      : res.json(INVALID_REQUEST);
  } catch (err) {
    console.error(
      new Error("User controller: Get all order Error"),
      err.message
    );
  }
};
const getOrderById = async (req, res) => {
  try {
    const orderById = await getOrderByIdDb(req);
    orderById.rows.length
      ? res.status(API_STATUS_CODES.SUCCESS).json({
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
  try {
    const createOrder = await creatOrderDb(req);
    createOrder.order
      ? res.status(API_STATUS_CODES.SUCCESS).json({
          message: RESPONSE_MESSAGES.ORDER_CREATED,
          body: createOrder,
          status: API_STATUS_CODES.SUCCESS,
        })
      : res.status(INVALID_REQUEST.status).json({
          message: INVALID_REQUEST.message,
          status: INVALID_REQUEST.status,
        });
  } catch (err) {
    res.status(CONTROLLER_ERROR.status).json({
      message: CONTROLLER_ERROR.message,
      status: CONTROLLER_ERROR.status,
    });
    console.log("here");
    logger.log({
      level: "error",
      message: err.message,
    });
    console.error(
      new Error("Customer controller: Create Order Error"),
      err.message
    );
  }
};

const cancelOrder = async (req, res) => {
  try {
    const cancelOrder = await cancelOrderDb(req);
    cancelOrder.rows.length
      ? res.status(API_STATUS_CODES.SUCCESS).json({
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

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  registerCustomer,
  loginCustomer,
  forgetP,
};
// const {
//   registerCustomerDb,
//   loginCustomerDb,
// } = require("../repository/customer.db");
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
// const registerCustomer = async (req, res) => {
//   try {
//     // console.log("In reg customer", req.body);
//     const createdUser = await registerCustomerDb(req);
//     // console.log("Register Controller: ", createdUser);
//     createdUser
//       ? res.status(API_STATUS_CODES.SUCCESS).json({
//           message: RESPONSE_MESSAGES.SUCCESS,
//           body: createdUser,
//         })
//       : res.json(CONTROLLER_ERROR);
//   } catch (error) {
//     if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
//       return res.status(API_STATUS_CODES.ERROR_CODE).json({
//         message: RESPONSE_MESSAGES.DUPLICATE_ENTRY,
//       });
//     }
//     console.error(
//       new Error("User controller: register Customer Error"),
//       error.message
//     );
//   }
// };
// const loginCustomer = async (req, res) => {
//   const { password } = req.body;
//   // console.log("In login", req.body);
//   try {
//     /**
//      * ? Existing User Check
//      */
//     const verifyUser = await loginCustomerDb(req);
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
//       // console.log("Not Matched");
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

//     res.status(API_STATUS_CODES.CREATED).json({
//       user: {
//         id: verifyUser.rows[0].customerId,
//         email: verifyUser.rows[0].email,
//       },
//       token: token,
//       message: RESPONSE_MESSAGES.SUCCESS,
//     });
//   } catch (error) {
//     console.error(
//       new Error("User controller: Login Customer Error"),
//       error.message
//     );
//   }
// };
