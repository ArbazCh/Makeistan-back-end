const dbConfig = require("../db.config");

//get All products
const getAllProductsDb = async ({sId}) => {

    const getQuery = ` SELECT * from "products" where "sellerId" = $1 ORDER BY "productId" ASC`;
  
    
    const allProduct= await pool.query( getQuery, [sId] );
  
    return allProduct;
  };
  
  const addProductDB = async ({name, description, image, unitPrice, stockQuantity, weight, 
    subcategoryId, sellerId }) =>{
  
    const addQuery = 
    
    `INSERT into "products" ("name", "description", "image", "unitPrice", 
    "stockQuantity", "weight", "subcategoryId", "sellerId")
    values ( $1, $2, $3, $4, $5, $6, $7, $8) Returning *`;
    
    const addProduct = await pool.query( 
      
      addQuery, 
      [name, description, image, unitPrice, stockQuantity, weight, subcategoryId, sellerId]
      
    );
  
    return addProduct;
  
  }
  
  const getProductByIdDB = async ({paramsId}) =>{
  
    const query = `select * from "products" where "productId" = $1 `;
    
    const getByID = await pool.query( query, [paramsId]);
  
    return getByID;
  
  }
  
  const updateProductDB = async (
    {
      name, description, image, unitPrice, stockQuantity, weight, subcategoryId, sellerId, id , sId
    }
    ) =>{
  
    const updateQuery = 
    
    `UPDATE "products" SET "name" = $1, "description" = $2, "image" = $3, "unitPrice" =$4, 
    "stockQuantity" = $5, "weight" =$6, "subcategoryId" =$7, "sellerId" =$8
     where "productId" = $9 AND "sellerId" =$10
     RETURNING *`;
    
    const updateProduct = await pool.query(
      
      updateQuery,
      [name, description, image, unitPrice, stockQuantity, weight, subcategoryId, sellerId, id , sId]
      
      );
  
    return updateProduct;
  
  }
  const deleteProductByIdDB = async ({ id, sId }) =>{
  
    const query = `delete from "products" where "productId" = $1 AND "sellerId" = $2 RETURNING *`;
      
    const deleteByID = await pool.query( query, [id, sId ]);
   
    return deleteByID;
  
  }


  module.exports={
    getAllProductsDb,
    addProductDB, 
    updateProductDB,
    getProductByIdDB,
    deleteProductByIdDB
  }