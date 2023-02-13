const router = require("express").Router();
const dbConfig = require("../db.config")
const {
    loginAdminDb,
    getAllCategoriesDb,
    getCategoryByIdDb,
    UpdateCategoryByIdDb,
    CreateCategoryDb,
    deleteCategoryByIdDb}=require('../repository/admin.db')
const {jwtGenerator}=require('../utils/utils')
const {
    API_STATUS_CODES,
    RESPONSE_MESSAGES,
} = require("../constants/constant");const { 
    CONTROLLER_ERROR, 
    INVALID_REQUEST } = require("../constants/error");
    const {
        getAllAdminOrdersDb,
        getAdminSellerOrdersByIDDb,
        getAdminCustomerOrdersByIDDb,
        
      } = require("../repository/order.db");
      const {getAllSellersDb}=require('../repository/seller.db')

const getAllCategories = async (req, res) => {
    
   
    try {
        const allCate = await getAllCategoriesDb();
        console.log(allCate.rows)
        res.json(allCate.rows);
    } catch (err) {
        console.error(err.message);
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategoryByIdDb();
        res.json(category.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

const UpdateCategoryById = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    console.log("id: ",id, "name:" , req.body);
    try {

        const updateCategory = await UpdateCategoryByIdDb(id,name);
        res.json("category was updated", updateCategory);
    } catch (err) {
        console.error(err.message);
    }

};

const CreateCategory = async (req, res) => {
   
    try {
        const {description}  = req.body;
        const newCate = await CreateCategoryDb({description});
    } catch (err) {
        console.error(err.message);
    }
};

const deleteCategoryById = async (req,res)=>{
    
    try {
        const {id} = req.params;
    
        const deleteCategory = await deleteCategoryByIdDb(id);
       
        res.json("category was deleted");
    } catch (err) {
        console.error(err.message);
    }
};

const adminLogin=async(req,res)=>{
    
    try {
        const {loginId, password} = req.body;
    
        const admin = await loginAdminDb({loginId})
    
        if(admin.rows.length === 0){
            return res.status(401).json("Password or loginId is incorrect");
        }  
    const dataBasePassword=admin.rows[0].password;
       if(dataBasePassword!==password){
        return res.status(401).json
        ("Password or loginId is incorrect");
       }

       const token = jwtGenerator(admin.rows[0].admin_id);
       res.json({token:token, message: "login Successfully"});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

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

const getAllSellers = async (req, res) => {


  try {

      const sellers = await getAllSellersDb();

      res.json(sellers.rows);

      console.log(sellers.rows)

  } catch (error) {

      console.log(error.message);
      res.status(API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
  }

}

module.exports = {
  getAllOrders,
  getOrdersBySellerId,
  getOrdersByCustomerId,
  getAllSellers,
  getAllCategories,
  getCategoryById,
  UpdateCategoryById,
  CreateCategory,
  deleteCategoryById,
  adminLogin
};
