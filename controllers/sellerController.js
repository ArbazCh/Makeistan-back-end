const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constant");
const { INVALID_REQUEST } = require("../constants/error");
const { getAllSellersOrderDb } = require("../repository/order.db");
const getAllOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await getAllSellersOrderDb({ id });
    // console.log(orders);
    if (orders)
      res.status(API_STATUS_CODES.SUCCESS).json({
        message: RESPONSE_MESSAGES.SUCCESS,
        body: orders.rows,
      });
    else {
      res.status(INVALID_REQUEST.status).json(INVALID_REQUEST);
    }
  } catch (err) {
    console.error("Seller Controller", err.message);
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  // console.log(orderId);
  try {
    const order = await getSellerOrderByID({ orderId });
    if (order)
      res.status(API_STATUS_CODES.SUCCESS).json({
        message: RESPONSE_MESSAGES.SUCCESS,
        body: order.rows,
      });
    else {
      res.status(INVALID_REQUEST.status).json(INVALID_REQUEST);
    }
  } catch (err) {}
};

const completeOrder = async (req, res) => {
  try {
  } catch (err) {}
};

const cancelOrder = async (req, res) => {
  try {
  } catch (err) {}
};

module.exports = {
  getAllOrders,
  getOrderById,
  completeOrder,
  cancelOrder,
};
