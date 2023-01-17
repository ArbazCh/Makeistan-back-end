const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constant");
const { CONTROLLER_ERROR, INVALID_REQUEST } = require("../constants/error");

const {
  getAllAdminOrdersDb,
  getAdminSellerOrdersByIDDb,
  getAdminCustomerOrdersByIDDb,
} = require("../repository/order.db");

const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllAdminOrdersDb({});
    // console.log(orders);
    if (orders.rows)
      res.status(API_STATUS_CODES.SUCCESS).json({
        message: RESPONSE_MESSAGES.SUCCESS,
        body: orders.rows,
      });
    else {
      res.status(INVALID_REQUEST.status).json(INVALID_REQUEST);
    }
  } catch (err) {
    res.status(INVALID_REQUEST.status).json(INVALID_REQUEST.message);
    console.error(new Error("admin Controller getAllOrder"), err.message);
  }
};

const getOrdersBySellerId = async (req, res) => {
  const { orderId, sellerId } = req.body;
  // console.log(orderId);
  try {
    const order = await getAdminSellerOrdersByIDDb({ orderId, sellerId });
    // console.log(order);
    if (order.rows >= 1)
      res.status(API_STATUS_CODES.SUCCESS).json({
        message: RESPONSE_MESSAGES.SUCCESS,
        body: order.rows,
      });
    else {
      res.status(INVALID_REQUEST.status).json(INVALID_REQUEST);
    }
  } catch (err) {
    res.status(INVALID_REQUEST.status).json(INVALID_REQUEST.message);
    console.error(
      new Error("admin Controller getOrderBySellerId"),
      err.message
    );
  }
};

const getOrdersByCustomerId = async (req, res) => {
  const { orderId, customerId } = req.body;
  // console.log(orderId);
  try {
    const order = await getAdminCustomerOrdersByIDDb({ orderId, customerId });
    // console.log(order);
    if (order.rows >= 1)
      res.status(API_STATUS_CODES.SUCCESS).json({
        message: RESPONSE_MESSAGES.SUCCESS,
        body: order.rows,
      });
    else {
      res.status(INVALID_REQUEST.status).json(INVALID_REQUEST);
    }
  } catch (err) {
    res.status(INVALID_REQUEST.status).json(INVALID_REQUEST.message);
    console.error(
      new Error("admin Controller getOrderByCustomerId"),
      err.message
    );
  }
};

module.exports = {
  getAllOrders,
  getOrdersBySellerId,
  getOrdersByCustomerId,
};
