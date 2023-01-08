-- Create Table
-- category table

CREATE TABLE "admin"(
"admin_id" SERIAL PRIMARY KEY,
"name" VARCHAR(35) NOT NULL,
"password" VARCHAR(30) NOT NULL,
 "user_id" VARCHAR(35) NOT NULL
);

CREATE TABLE "categories" (
  "category_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL
);
-- sub-category table
CREATE TABLE "subCategories" (
  "subCategory_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
-- 	ADD FOREIGN KEY LATER ON.
  "category_id" INT NOT NULL	
);

CREATE TABLE "sellers" (
  "seller_id" SERIAL PRIMARY KEY,
  "email" VARCHAR(50) NOT NULL,
  "fullName" VARCHAR(40) NOT NULL,
  "number" VARCHAR(50) NOT NULL,
  "CNIC" INT NOT NULL,
  "address" VARCHAR(255) NOT NULL,
  "shopName" VARCHAR(30) NOT NULL,
  "password" VARCHAR(25) NOT NULL,
  "cnicPicture" VARCHAR(60) NOT NULL
);

CREATE TABLE "products" (
  "product_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(40) NOT NULL,
  "discription" VARCHAR NOT NULL,
  "images" VARCHAR NOT NULL,
  "SKU" VARCHAR(40) NOT NULL,
  "unitPrice" VARCHAR(35) NOT NULL,
  "stockQuantity" VARCHAR(45) NOT NULL,
  "weight" VARCHAR(30) NOT NULL,
  -- 	ADD FOREIGN KEY LATER ON.
  "subCategory_id" INT NOT NULL,
	-- 	ADD FOREIGN KEY LATER ON.
  "seller_id" INT NOT NULL
);


 CREATE TABLE "users" (
  "customer_id" SERIAL PRIMARY KEY,
  "email" VARCHAR(50) NOT NULL,
  "password" VARCHAR(40) NOT NULL,
  "firstName" VARCHAR(25) NOT NULL,
  "lastName" VARCHAR(30) NOT NULL,
  "address" VARCHAR(255) NOT NULL,
);

CREATE TABLE paymentMethods(
"payment_id" SERIAL PRIMARY KEY,
"paymentType" VARCHAR(25) NOT NULL
);

CREATE TABLE "orders"(
"order_id" SERIAL PRIMARY KEY,
--FK
"customer_id" INT NOT NULL,
--FK
"seller_id" INT NOT NULL,
--FK
"payment_id" INT NOT NULL,
"date" DATE NOT NULL,
"time" TIME NOT NULL,
"orderStatus" VARCHAR(30) NOT NULL);

CREATE TABLE orderDetails(
"OrderDetail_id" SERIAL PRIMARY KEY,
--FK
"order_id" INT NOT NULL,
--FK
"product_id" INT NOT NULL,
"orderNumber" VARCHAR NOT NULL,
"price" INT NOT NULL,
"quantity" INT NOT NULL,
"shippingFee" INT NOT NULL,
"totalPrice "INT NOT NULL);


ALTER TABLE "subCategories" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("category_id");
ALTER TABLE "products" ADD FOREIGN KEY ("subCategory_id") REFERENCES "subCategories" ("subCategory_id");
ALTER TABLE "products" ADD FOREIGN KEY ("seller_id") REFERENCES "sellers" ("seller_id");

ALTER TABLE "orders" ADD FOREIGN KEY ("customer_id") REFERENCES "users" ("customer_id");
ALTER TABLE "orders" ADD FOREIGN KEY ("seller_id") REFERENCES "sellers" ("seller_id");
ALTER TABLE "orders" ADD FOREIGN KEY ("payment_id") REFERENCES "paymentMethods" ("payment_id");
ALTER TABLE "orderDetails" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("order_id");
ALTER TABLE "orderDetails" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("product_id");



-- Insert Data into paymentMethods, 1 type
INSERT INTO "paymentMethods" ("paymentType") VALUES ('COD');
