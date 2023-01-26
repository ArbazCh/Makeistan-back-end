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
const { loginAdminDb } = require("../repository/admin.db");

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

const getAllCategories = async (req, res) => {
  try {
    const allCate = await pool.query("SELECT * FROM categories");
    res.json(allCate.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await pool.query(
      `SELECT * FROM "categories" WHERE "categoryId" = $1`,
      [id]
    );
    res.json(category.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const UpdateCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;
    const updateCategory = await pool.query(
      `UPDATE categories SET "name" = $1 WHERE "categoryId" = $2`,
      [name, categoryId]
    );
    res.json("category was updated");
  } catch (err) {
    console.error(err.message);
  }
};

const CreateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCate = await pool.query(
      `INSERT INTO categories("name") VALUES ($1) RETURNING *`,
      [name]
    );

    res.json(newCate.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const loginAdmin = async (req, res) => {
  const { loginId, password } = req.body;
  try {
    /**
     * ? Existing User Check
     */

    const verifyAdmin = await loginAdminDb({ loginId });
    // console.log("Inside try login controller: ", verifyAdmin.rows);
    if (verifyAdmin.rows.length < 1) {
      return res.json({ INVALID_REQUEST });
    }
    /**
     * Compare entered Password with hashed password in the db
     */
    const matchPassword = await bcrypt.compare(
      password,
      verifyAdmin.rows[0].password
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
        id: verifyAdmin.rows[0].loginId,
        name: verifyAdmin.rows[0].name,
      },
      process.env.SECRET_KEY
    );
    res.json({
      status: API_STATUS_CODES.CREATED,
      admin: {
        id: verifyAdmin.rows[0].loginId,
        name: verifyAdmin.rows[0].name,
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
  getOrdersBySellerId,
  getOrdersByCustomerId,
  getAllCategories,
  getCategoryById,
  UpdateCategoryById,
  CreateCategory,
  loginAdmin,
};
