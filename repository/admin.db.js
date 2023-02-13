const pool = require("../db.config")
const loginAdminDb = async ({ loginId }) => {
    try {
      const query = `SELECT * FROM admin where "loginId" = $1`;
      
      const result = await pool.query(query, [loginId]);

      return result;
    } catch (error) {
      console.error(error.message);
    }
  };
const getAllCategoriesDb = async (req, res) => {
   
  try {
      const allCate = await pool.query(`SELECT * FROM "categories"`);
      return allCate
  } catch (err) {
      console.error(err.message);
  }
};

const getCategoryByIdDb = async (req, res) => {
  try {
      const { categoryId } = req.params;
      const category = await pool.query(`SELECT * FROM "categories" WHERE "categoryId" = $1`, [
          categoryId
      ]);
      return category
  } catch (err) {
      console.error(err.message);
  }
};
 const UpdateCategoryByIdDb =  async (id,name) => {
  try {
     
      const updateCategory = await pool.query(`UPDATE categories SET "name" = $1 WHERE "categoryId" = $2`,
          [name, id]
      );
     return updateCategory
  } catch (err) {
      console.error(err.message);
  }

};
 const CreateCategoryDb = async ({description}) => {
  try {
      const newCate = await pool.query(
          `INSERT INTO categories("name") VALUES ($1) RETURNING *`,
          [description]
      );
      return newCate
  } catch (err) {
      console.error(err.message);
  }
};

const deleteCategoryByIdDb = async (id)=>{
  console.log(id)
  
  try {
      const deleteCategory = await pool.query(`DELETE FROM categories WHERE "categoryId" =$1`,[
          id
      ]);
      return deleteCategory
  } catch (err) {
      console.error(err.message);
  }
};

  module.exports = {loginAdminDb, getAllCategoriesDb, getCategoryByIdDb, UpdateCategoryByIdDb,CreateCategoryDb,deleteCategoryByIdDb,};