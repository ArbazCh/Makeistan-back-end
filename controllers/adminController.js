const router = require("express").Router();
const pool = require("../db.config")
const {
    loginAdminDb,
    getAllCategoriesDb,
    getCategoryByIdDb,
    UpdateCategoryByIdDb,
    CreateCategoryDb,
    deleteCategoryByIdDb}=require('../repository/admin.db')
const {jwtGenerator}=require('../utils/utils')

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


module.exports = {getAllCategories,
    getCategoryById,UpdateCategoryById,CreateCategory,deleteCategoryById,adminLogin};