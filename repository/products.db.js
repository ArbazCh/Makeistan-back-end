const dbConfig = require("../db.config");

//get All products
const getAllProductsDb = async ({sId}) => {

    const getQuery = ` SELECT * from "products" where "sellerId" = $1 ORDER BY "productId" ASC`;
  
    
    const allProduct= await pool.query( getQuery, [sId] );
  
    return allProduct;
  };
  
  const addProductDB = async ({ name, description, image, unitPrice, stockQuantity, weight,
    subcategoryId, sId}) =>{

  
    const addQuery = 
    
    `INSERT into "products" ("name", "description", "image", "unitPrice", 
    "stockQuantity", "weight", "subcategoryId", "sellerId")
    values ( $1, $2, $3, $4, $5, $6, $7, $8) Returning *`;

    
    
    const addProduct = await pool.query( 
      
      addQuery, 
      [name, description, image, unitPrice, stockQuantity, weight, subcategoryId, sId]
      
    );
  
    return addProduct;
  
  }
  
  const getProductDetailByIdDB = async ({paramsId, sId}) =>{
  
    const query = `select * from "products" where "productId" = $1 AND "sellerId" = $2 `;
    
    const getByID = await pool.query( query, [paramsId, sId]);
  
    return getByID;
  
  }
  
  const updateProductDB = async (
    {
      name, description, image, unitPrice, stockQuantity, weight, subcategoryId, id , sId
    }
    ) =>{
  
    const updateQuery = 
    
    `UPDATE "products" SET "name" = $1, "description" = $2, "image" = $3, "unitPrice" =$4, 
    "stockQuantity" = $5, "weight" =$6, "subcategoryId" =$7 where "productId" = $8 AND "sellerId" =$9
     RETURNING *`;
    
    const updateProduct = await pool.query(
      
      updateQuery,
      [name, description, image, unitPrice, stockQuantity, weight, subcategoryId, id , sId]
        
      );
  
    return updateProduct;
  
  }
  const deleteProductByIdDB = async ({ id, sId }) =>{
  
    const query = `delete from "products" where "productId" = $1 AND "sellerId" = $2 RETURNING *`;
      
    const deleteByID = await pool.query( query, [id, sId ]);
   
    return deleteByID;
  
  }

  //get all Product DB For customer

  const getAllProductsForCustomerDb = async () => {

    const getQuery = ` SELECT * from "products" ORDER BY "productId" ASC`;
  
    
    const allProduct= await dbConfig.query( getQuery);
  
    return allProduct;
  };

  const getProductForCustomerByIdDB = async ({pId}) =>{

    //console.log("id=",pId);
    
    const query = `SELECT * FROM "products" where "productId" = $1 `;
    
    const getByID = await dbConfig.query( query, [pId]);
  
    return getByID;
  
  }


  module.exports={
    getAllProductsDb,
    addProductDB, 
    updateProductDB,
    getProductDetailByIdDB,
    deleteProductByIdDB,
    getAllProductsForCustomerDb,
    getProductForCustomerByIdDB
  }