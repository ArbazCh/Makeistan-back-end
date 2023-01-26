const dbConfig = require("../db.config");

//get All orders for test onlny
const getAllOrderDb = async ({ id }) => {
  return await dbConfig.query(`SELECT * FROM "orders" WHERE "customerId"=$1`, [
    id,
  ]);
};

//Get order by id
const getOrderByIdDb = async ({ orderId, id }) => {
  // console.log("orderId: ", orderId, "customerd", id);
  const query = `SELECT * FROM "orders" WHERE "customerId"=$1 AND "orderId"=$2`;
  //`
  // SELECT  o."orderId", oi."orderNumber",u."customerId",p."name",p."unitPrice",o."orderStatus",oi."quantity"
  // FROM users as u
  // INNER JOIN orders as o
  // ON o."customerId"=u."customerId"
  // INNER JOIN "orderItem" as oi
  // ON oi."orderId"=o."orderId"
  // INNER JOIN "products" as p
  // ON p."productId"=oi."productId"
  //   WHERE o."orderId"=$1 AND u."customerId"=$2
  // `;

  const first = await dbConfig.query(query, [id, orderId]); // return the result
  // console.log(first.rows);
  return first;
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
  sellerId,
  orderNumber,
}) => {
  //INSERT INTO ORDER TABLE
  const insertOrder = `INSERT INTO orders("customerId","paymentId","date","time","orderStatus") VALUES($1,$2,$3,$4,$5) RETURNING "orderId"`;
  const order = await dbConfig.query(insertOrder, [
    id,
    paymentId,
    date,
    time,
    orderStatus,
  ]);
  // console.log(order.rows[0].orderId);
  const orderId = order.rows[0].orderId;
  // INSERT INTO ORDER ITEM TABLE
  const insertorderItem = `INSERT INTO "orderItem"("orderId","productId","sellerId","orderNumber","quantity") VALUES ($1,$2,$3,$4,$5) RETURNING*`;
  const item = await dbConfig.query(insertorderItem, [
    orderId,
    productId,
    sellerId,
    orderNumber,
    quantity,
  ]);
  return { order, item };
};

//Cancel order Db
const cancelOrderDb = async ({ id, orderId }) => {
  // console.log("Cancel order Db");
  const query = `UPDATE "orders" SET "orderStatus"='Cancelled' WHERE "customerId"=$1 AND "orderId"=$2 RETURNING *`;
  return await dbConfig.query(query, [id, orderId]);
};

const getAllSellersOrderDb = async ({ id }) => {
  const query = `SELECT * FROM "orderItem" WHERE "sellerId"=$1`;
  const orders = await dbConfig.query(query, [2]);
  return orders;
};

const getSellerOrderByIDDb = async ({ orderId }) => {
  const query = `SELECT * FROM "orderItem" WHERE "sellerId"=$1 AND "orderId"=$2`;
  const order = await dbConfig.query(query, [1, orderId]);
  // console.log(order.rows >= 1);
  return order;
};

const sellerOrderCompleteDb = async ({ orderId }) => {
  const query = `UPDATE "orders"
  SET "orderStatus"='Delivered'
  WHERE "orderId"= (
    SELECT "orderId" FROM "orderItem"
  WHERE "sellerId"=$1 AND "orderId"=$2);`;
  const status = dbConfig.query(query, [1, orderId]);
  return status;
};

const sellerOrderCancelDb = async ({ orderId }) => {
  const query = `UPDATE "orders" SET "orderStatus"='Cancelled' WHERE "sellerId"=$1 AND "orderId"=$2 RETURNING *`;
  return await dbConfig.query(query, [2, orderId]);
};

const getAllAdminOrdersDb = async () => {
  const query = `SELECT * FROM "orders"`;
  const orders = dbConfig.query(query);
  return orders;
};

const getAdminSellerOrdersByIDDb = async ({ orderId, sellerId }) => {
  const query = `SELECT * FROM "orderItem" WHERE orderId=$1 AND "sellerId"=$2`;
  const orders = dbConfig.query(query, [orderId, sellerId]);
  return orders;
};

const getAdminCustomerOrdersByIDDb = async ({ orderId, customerId }) => {
  const query = `SELECT * FROM "orderItem" WHERE orderId=$1 AND "customerId"=$2`;
  const orders = dbConfig.query(query, [orderId, customerId]);
  return orders;
};
module.exports = {
  getAllOrderDb,
  getOrderByIdDb,
  creatOrderDb,
  cancelOrderDb,
  getAllSellersOrderDb,
  getSellerOrderByIDDb,
  sellerOrderCompleteDb,
  sellerOrderCancelDb,
  getAllAdminOrdersDb,
  getAdminSellerOrdersByIDDb,
  getAdminCustomerOrdersByIDDb,
};
