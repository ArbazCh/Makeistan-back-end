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
      // calling the function from the Database folder for creating an order
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

module.exports = { getAllOrders, getOrderById, createOrder, cancelOrder };
