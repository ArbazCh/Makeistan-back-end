const dbConfig = require("../db.config");

//get All orders for test onlny
const getAllOrderDb = async () => {
  return await dbConfig.query(`SELECT * FROM "orders"`);
};

//Get order by id
const getOrderDb = async ({ id }) => {
  const query = `
      SELECT  o."orderId", oi."orderNumber",u."customerId",p."name",p."unitPrice",o."orderStatus",oi."quantity"
      FROM users as u
      INNER JOIN orders as o
      ON o."customerId"=u."customerId"	
      INNER JOIN "orderItem" as oi 
      ON oi."orderId"=o."orderId"
      INNER JOIN "products" as p
      ON p."productId"=oi."productId"
        WHERE o."orderId"=$1
      `;
  return await dbConfig.query(query, [id]); // return the result
};

//Create order against the customer id

//!!!How to insert in order item table if there are more than one product id's
const creatOrderDb = async ({
  id,
  productId, //it can b array of multiple values???? To do
  quantity,
  paymentId,
  date,
  time,
  orderStatus,
  orderId, // !!!how to insert in order itme???, Run Multiple Queries for Order and  Order Item
  sellerId,
  orderNumber,
}) => {
  //INSERT INTO ORDER TABLE
  const insertOrder = `INSERT INTO orders("customerId","paymentId","date","time","orderStatus") VALUES($1,$2,$3,$4,$5) RETURNING *`;
  const order = await dbConfig.query(insertOrder, [
    id,
    paymentId,
    date,
    time,
    orderStatus,
  ]);

  // const { id } = order;
  //INSERT INTO ORDER ITEM TABLE//
  const insertorderItem = `INSERT INTO "orderItem"("orderId","productId","sellerId","orderNumber","quantity") VALUES ($1,$2,$3,$4,$5) RETURNING*`;
  const item = await dbConfig.query(insertorderItem, [
    orderId,
    productId,
    sellerId,
    orderNumber,
    quantity,
  ]);
  return { order }; //?? Need to confirm
};

//Cancel order Db
const cancelOrderDb = async ({ id }) => {
  console.log("Cancel order Db");
  const query = `UPDATE "orders" SET "orderStatus"='Cancelled' WHERE "orderId"=$1 RETURNING *`;
  return await dbConfig.query(query, [id]);
};
module.exports = { getAllOrderDb, getOrderDb, creatOrderDb, cancelOrderDb };
