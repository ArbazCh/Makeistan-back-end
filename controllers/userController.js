const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constant");
const { CONTROLLER_ERROR, INVALID_REQUEST } = require("../constants/error");
const {
  getAllOrderDb,
  getOrderDb,
  creatOrderDb,
  cancelOrderDb,
} = require("../Database/order.db");
const {
  registerCustomerDb,
  loginCustomerDb,
} = require("../Database/customer.db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrderDb();
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
  // console.log("Get by Id");
  try {
    const { id } = req.params;
    const orderById = await getOrderDb({ id });
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
  try {
    const { id } = req.params;
    const {
      productId,
      quantity,
      paymentId,
      date,
      time,
      orderStatus,
      orderId,
      sellerId,
      orderNumber,
    } = req.body;
    const createOrder = await creatOrderDb({
      id,
      productId,
      quantity,
      paymentId,
      date,
      time,
      orderStatus,
      orderId,
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
      new Error("User controller: Create Order Error"),
      err.message
    );
  }
};

const cancelOrder = async (req, res) => {
  s;
  try {
    const { id } = req.params;
    const cancelOrder = await cancelOrderDb({ id });
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

const registerCustomer = async (req, res) => {
  try {
    // console.log("In reg customer", registerCustomer);
    const { email, password, firstName, lastName, address } = req.body;
    const createdUser = await registerCustomerDb({
      email,
      password,
      firstName,
      lastName,
      address,
    });
    // console.log("Register Controller: ", createdUser);
    createdUser
      ? res.json({
          status: API_STATUS_CODES.SUCCESS,
          message: RESPONSE_MESSAGES.SUCCESS,
          body: createdUser,
        })
      : res.json(CONTROLLER_ERROR);
  } catch (error) {
    if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
      return res.json({
        status: API_STATUS_CODES.ERROR_CODE,
        message: RESPONSE_MESSAGES.DUPLICATE_ENTRY,
      });
    }
    console.log("Catch Error: ", error);
  }
};
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;
  try {
    /**
     * ? Existing User Check
     */

    const verifyUser = await loginCustomerDb({ email });
    // console.log("Inside try login controller: ", verifyUser.rows);
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
        id: verifyUser.rows[0].userId,
        email: verifyUser.rows[0].email,
      },
      process.env.SECRET_KEY
    );
    res.json({
      status: API_STATUS_CODES.CREATED,
      user: {
        id: verifyUser.rows[0].userId,
        name: verifyUser.rows[0].firstName,
        email: verifyUser.rows[0].email,
      },
      token: token,
      message: RESPONSE_MESSAGES.SUCCESS,
    });
  } catch (error) {
    console.log("Login Controller Catch Error: ", error);
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
