const { default: db } = require("node-pg-migrate/dist/db");
const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constant");
const { INVALID_REQUEST } = require("../constants/error");
const {
  getAllSellersOrderDb,
  getSellerOrderByIDDb,
  sellerOrderCompleteDb,
} = require("../repository/order.db");
const getAllOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await getAllSellersOrderDb({ id });
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
    console.error("Seller Controller getAllOrders Catch Error", err.message);
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  // console.log(orderId);
  try {
    const order = await getSellerOrderByIDDb({ orderId });
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
    console.error("Seller Controller getOrderById Catch Error", err.message);
  }
};

const completeOrder = async (req, res) => {
  const { orderID } = req.params;
  try {
    const status = await sellerOrderCompleteDb({ orderID });
    // console.log(status);
    if (status.rows >= 1)
      res.status(API_STATUS_CODES.SUCCESS).json({
        message: RESPONSE_MESSAGES.SUCCESS,
        body: status.rows,
      });
    else {
      res.status(INVALID_REQUEST.status).json(INVALID_REQUEST);
    }
  } catch (err) {
    console.error(
      new Error("Seller controller Complete Order Error"),
      err.message
    );
  }
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const cancelOrder = await sellerOrderCancelDb({ orderId });
    cancelOrder.rows.length
      ? res.json({
          status: API_STATUS_CODES.SUCCESS,
          message: RESPONSE_MESSAGES.ORDER_CANCLLED,
        })
      : res.json({ CONTROLLER_ERROR });
  } catch (err) {
    console.error(
      new Error("Seller controller Cancel Order Error"),
      err.message
    );
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  completeOrder,
  cancelOrder,
};
