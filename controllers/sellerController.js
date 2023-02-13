const jwtGenerator = require("../utils/jwtToken/jwtGenerator");
const bcrypt = require("bcrypt");
const { default: db } = require("node-pg-migrate/dist/db");
const { INVALID_REQUEST } = require("../constants/error");
const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constant");
const {
  getAllSellersOrderDb,
  getSellerOrderByIDDb,
  sellerOrderCompleteDb,
} = require("../repository/order.db");
const { isEmailDB, signUpDB } = require("../repository/seller.db");
const {
  getProductDetailByIdDB,
  deleteProductByIdDB,
  addProductDB,
  updateProductDB,
  getAllProductsDb,
  getAllProductsForCustomerDb,
  getProductForCustomerByIdDB,
} = require("../repository/products.db");

/* Sellers Controller */

const sellerSignup = async (req, res) => {
  try {
    const {
      profilePicture,
      email,
      fullName,
      CNIC,
      mobileNumber,
      address,
      shopName,
      cnicPicture,
      password,
    } = req.body;

    const seller = await isEmailDB({ email });

    if (seller.rows.length !== 0) {
      return res
        .status(API_STATUS_CODES.ERROR_CODE)
        .send(RESPONSE_MESSAGES.DUPLICATE_ENTRY);
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const hashPassword = await bcrypt.hash(password, salt);

    const newSeller = await signUpDB({
      profilePicture,
      email,
      fullName,
      CNIC,
      mobileNumber,
      address,
      shopName,
      cnicPicture,
      hashPassword,
    });

    //res.json(newSeller.rows);

    const token = jwtGenerator(newSeller.rows[0].sellerId);

    return res.json([token, newSeller.rows]);
  } catch (error) {
    console.log(error.message);
    res
      .status(API_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
  }
};

const sellerLogin = async (req, res) => {
  try {
    /* Destructuring Required Data */
    const { email, password } = req.body;

    /**
     * ? Existing User Check
     */
    const seller = await isEmailDB({ email });
    if (seller.rows.length === 0) {
      return res.status(401).send("Seller Does'nt Exit");
    }
    //res.json(seller.rows[0].password)

    /* Compare Passwords */
    const hashedPassword = await bcrypt.compare(
      password,
      seller.rows[0].password
    );

    if (!hashedPassword) {
      return res.status(401).json("Password is incorrect");
    }

    /* JWT Token */

    const token = jwtGenerator(seller.rows[0].sellerId);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
};

const getSellerProfile = async (req, res) => {
  const sId = req.seller.id;

  try {
    const sellerById = await getSellerByIdDB({ sId });

    res.status(API_STATUS_CODES.SUCCESS).json(sellerById.rows[0]);
  } catch (error) {
    console.log(error.message);
    res
      .status(API_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
  }
};

/* Seller Product Controllers */

const addProduct = async (req, res) => {
  // change into git hub code
  const {
    name,
    description,
    image,
    unitPrice,
    stockQuantity,
    weight,
    subcategoryId,
  } = req.body;
  const sId = req.seller.id;

  console.log(sId);

  //console.log("add front req", request);
  try {
    const newProduct = await addProductDB({
      name,
      description,
      image,
      unitPrice,
      stockQuantity,
      weight,
      subcategoryId,
      sId,
    });

    res.json(newProduct.rows[0]);
  } catch (error) {
    res
      .status(API_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const sId = req.seller.id;

  try {
    await deleteProductByIdDB({ id, sId });

    res.json(RESPONSE_MESSAGES.PRODUCT_DELETED);
  } catch (error) {
    console.error(error.message);
    res
      .status(API_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
  }
};

const getAllProduct = async (req, res) => {
  const sId = req.seller.id;
  // console.log(sId);
  try {
    const products = await getAllProductsDb({ sId });

    if (products.rows.length === 0) {
      return res.json("Product Not Found");
    }

    res.json(products.rows);
  } catch (error) {
    console.log(error.message);
    res
      .status(API_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const sId = req.seller.id;

  try {
    const {
      name,
      description,
      image,
      unitPrice,
      stockQuantity,
      weight,
      subcategoryId,
      sellerId,
    } = req.body;

    if (`${sId === sellerId}`) {
      await updateProductDB({
        name,
        description,
        image,
        unitPrice,
        stockQuantity,
        weight,
        subcategoryId,
        sellerId,
        id,
        sId,
      });
    } else {
      return res.json("Seller ID or Product Id is Incorrect");
    }

    res.json(RESPONSE_MESSAGES.PRODUCT_UPDATED);
  } catch (error) {
    console.error(error.message);
    res
      .status(API_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
  }
};

const getSellerProductDetailById = async (req, res) => {
  const { paramsId } = req.params;

  const sId = req.seller.id;

  try {
    const productById = await getProductDetailByIdDB({ paramsId, sId });

    if (productById.rows.length === 0) {
      return res.json("Product Not Found");
    }

    res.status(API_STATUS_CODES.SUCCESS).json(productById.rows);
  } catch (error) {
    console.log(error.message);
    res
      .status(API_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
  }
};

// get Products for customer

const getAllProductsForCustomer = async (req, res) => {
  try {
    const products = await getAllProductsForCustomerDb();

    if (products.rows.length === 0) {
      return res.json("Product Not Found");
    }

    res.json(products.rows);
  } catch (error) {
    console.log(error.message);
    res
      .status(API_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
  }
};

const getProductForCustomerById = async (req, res) => {
  const pId = req.params.id;

  console.log(req.params);

  try {
    const productById = await getProductForCustomerByIdDB({ pId });

    if (productById.rows.length === 0) {
      return res.json("Product Not Found");
    } else {
      res.json(productById.rows);
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(API_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
  }
};

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
  sellerSignup,
  sellerLogin,
  getSellerProfile,
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
  getSellerProductDetailById,
  getAllProductsForCustomer,
  getProductForCustomerById,
};
