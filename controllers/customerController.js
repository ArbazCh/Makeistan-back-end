require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
  console.log("req: ", req.body);

  try {
    const createOrder = await creatOrderDb(req);
    // console.log(createOrder);
    createOrder
      ? res.status(API_STATUS_CODES.SUCCESS).json({
          message: RESPONSE_MESSAGES.ORDER_CREATED,
          body: createOrder,
        })
      : res.json({ INVALID_REQUEST });
    // console.log("Im here");
  } catch (err) {
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

const registerCustomer = async (req, res) => {
  try {
    // console.log("In reg customer", registerCustomer);
    const createdUser = await registerCustomerDb(req);
    // console.log("Register Controller: ", createdUser);
    createdUser
      ? res.status(API_STATUS_CODES.SUCCESS).json({
          message: RESPONSE_MESSAGES.SUCCESS,
          body: createdUser,
        })
      : res.json(CONTROLLER_ERROR);
  } catch (error) {
    if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
      return res.status(API_STATUS_CODES.ERROR_CODE).json({
        message: RESPONSE_MESSAGES.DUPLICATE_ENTRY,
      });
    }
    console.error(
      new Error("User controller: register Customer Error"),
      error.message
    );
  }
};
const loginCustomer = async (req, res) => {
  const { password } = req.body;
  // console.log("In login", req.body);
  try {
    /**
     * ? Existing User Check
     */
    const verifyUser = await loginCustomerDb(req);
    // console.log("Inside try login controller verifyUser: ", verifyUser.rows[0]);
    if (verifyUser.rows.length < 1) {
      return res.json({ INVALID_REQUEST });
    }
    /**
     * Compare entered Password with hashed password in the db
     */
    const matchPassword = await bcrypt.compare(
      password,
      verifyUser.rows[0].password
    );
    // console.log("Matched Password : ", matchPassword);
    if (!matchPassword) {
      return res.json({ INVALID_REQUEST });
    }
    /**
     * Return JWT Token
     */
    const token = await jwt.sign(
      {
        id: verifyUser.rows[0].customerId,
        email: verifyUser.rows[0].email,
      },
      process.env.SECRET_KEY
    );

    res.status(API_STATUS_CODES.CREATED).json({
      user: {
        id: verifyUser.rows[0].customerId,
        email: verifyUser.rows[0].email,
      },
      token: token,
      message: RESPONSE_MESSAGES.SUCCESS,
    });
  } catch (error) {
    console.error(
      new Error("User controller: Login Customer Error"),
      error.message
    );
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  cancelOrder,
  registerCustomer,
  loginCustomer,
};
