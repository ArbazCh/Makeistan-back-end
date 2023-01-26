-- Create Table
-- category table

CREATE TABLE "admin"(
"adminId" SERIAL PRIMARY KEY,
"name" VARCHAR(35) NOT NULL,
"loginId" VARCHAR(35) NOT NULL,
"password" VARCHAR(30) NOT NULL

);

CREATE TABLE "categories" (
  "categoryId" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL
);
-- sub-category table
CREATE TABLE "subCategories" (
  "subcategoryId" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
-- 	ADD FOREIGN KEY LATER ON.
  "categoryId" INT NOT NULL	
);

CREATE TABLE "sellers" (
  "sellerId" SERIAL PRIMARY KEY,
  "profilePicture" VARCHAR NOT NULL,
  "email" VARCHAR(50) NOT NULL,
  "fullName" VARCHAR(40) NOT NULL,
  "mobileNumber" BIGINT NOT NULL,
  "CNIC" BIGINT NOT NULL,
  "address" VARCHAR(255) NOT NULL,
  "shopName" VARCHAR(30) NOT NULL,
  "cnicPicture" VARCHAR(60) NOT NULL
);

CREATE TABLE "products" (
  "productId" SERIAL PRIMARY KEY,
  "name" VARCHAR(40) NOT NULL,
  "description" VARCHAR NOT NULL,
  "image" VARCHAR NOT NULL,
  "unitPrice" INT NOT NULL,
  "stockQuantity" INT NOT NULL,
  "weight" INT NOT NULL,
  -- 	ADD FOREIGN KEY LATER ON.
  "subcategoryId" INT NOT NULL,
	-- 	ADD FOREIGN KEY LATER ON.
  "sellerId" INT NOT NULL
);


 CREATE TABLE "users" (
  "customerId" SERIAL PRIMARY KEY,
  "email" VARCHAR(50) NOT NULL,
  "password" VARCHAR(40) NOT NULL,
  "firstName" VARCHAR(25) NOT NULL,
  "lastName" VARCHAR(30) NOT NULL,
  "address" VARCHAR(255) NOT NULL
);

CREATE TABLE "paymentMethods"(
"paymentId" SERIAL PRIMARY KEY,
"paymentType" VARCHAR(25) NOT NULL
);

CREATE TABLE "orders"(
"orderId" SERIAL PRIMARY KEY,
--FK
"customerId" INT NOT NULL,
--FK
"paymentId" INT NOT NULL,
"date" DATE NOT NULL,
"time" TIME NOT NULL,
"orderStatus" VARCHAR(30) NOT NULL);

CREATE TABLE "orderItem"(
"orderitemId" SERIAL PRIMARY KEY,
--FK
"orderId" INT NOT NULL,
--FK
"productId" INT NOT NULL,
--FK
"sellerId" INT NOT NULL,
"orderNumber" VARCHAR NOT NULL,
"quantity" INT NOT NULL);


ALTER TABLE "subCategories" ADD FOREIGN KEY ("categoryId") REFERENCES "categories" ("categoryId");
ALTER TABLE "products" ADD FOREIGN KEY ("subcategoryId") REFERENCES "subCategories" ("subcategoryId");
ALTER TABLE "products" ADD FOREIGN KEY ("sellerId") REFERENCES "sellers" ("sellerId");

ALTER TABLE "orders" ADD FOREIGN KEY ("customerId") REFERENCES "users" ("customerId");
ALTER TABLE "orderItem" ADD FOREIGN KEY ("sellerId") REFERENCES "sellers" ("sellerId");
ALTER TABLE "orders" ADD FOREIGN KEY ("paymentId") REFERENCES "paymentMethods" ("paymentId");
ALTER TABLE "orderItem" ADD FOREIGN KEY ("orderId") REFERENCES "orders" ("orderId");
ALTER TABLE "orderItem" ADD FOREIGN KEY ("productId") REFERENCES "products" ("productId");

-------------------------------------------INSERT DUMMY DATA------------------------------------------------------------


-- 1. Insert Data into paymentMethods, 1 type
INSERT INTO "paymentMethods" ("paymentType") VALUES ('COD');

-- 2. Insert Data into Category, 1 Category
insert into "categories" ("name") values ('Garments');

-- 3. Insert Data into subCategories, 3 subCategories
insert into "subCategories" ("name", "categoryId") values ('Men', 1);
insert into "subCategories" ("name", "categoryId") values ('Women', 1);
insert into "subCategories" ("name", "categoryId") values ('Kids', 1);

-- 4. Insert Data into sellers, 10 Sellers
insert into "sellers" ("email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") values (1, 'triggeard0@wikia.com', 'Ivonne D''Ambrosi', '360 592 6578', '781 725 0185', 'Apt 1494', 'Tonia Riggeard', 'http://dummyimage.com/205x187.png/ff4444/ffffff');
insert into "sellers" ("email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") values (2, 'cgookey1@sina.com.cn', 'Pavlov Fraczak', '975 878 0920', '960 105 3240', 'Apt 165', 'Chloe Gookey', 'http://dummyimage.com/124x162.png/cc0000/ffffff');
insert into "sellers" ("email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") values (3, 'acannan2@businesswire.com', 'Sheila Truin', '389 129 9683', '540 329 2720', 'PO Box 57046', 'Andrew Cannan', 'http://dummyimage.com/250x174.png/dddddd/000000');
insert into "sellers" ("email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") values (4, 'kmcconaghy3@auda.org.au', 'Penn Budik', '470 142 0209', '861 770 1916', 'Room 1270', 'Kerry McConaghy','http://dummyimage.com/169x111.png/dddddd/000000');
insert into "sellers" ("email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") values (5, 'ckarpov4@fastcompany.com', 'Wendeline Ciciura', '233 242 9293', '436 549 3250', '3rd Floor', 'Cherry Karpov', 'http://dummyimage.com/237x223.png/ff4444/ffffff');
insert into "sellers" ("email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") values (6, 'tlucken5@scientificamerican.com', 'Sharl Tortice', '289 653 0438', '947 136 5134', 'Suite 73', 'Travis Lucken', 'http://dummyimage.com/233x120.png/cc0000/ffffff');
insert into "sellers" ("email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") values (7, 'oclayborn6@reverbnation.com', 'Sascha Bonwick', '105 139 4710', '555 804 2662', 'Apt 586', 'Ogdon Clayborn', 'http://dummyimage.com/136x219.png/dddddd/000000');
insert into "sellers" ("email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") values (8, 'bseston7@nasa.gov', 'Rora Rake', '804 500 0925', '487 799 2535', 'Room 1283', 'Bertrando Seston', 'HzpT4KeX', 'http://dummyimage.com/161x163.png/ff4444/ffffff');
insert into "sellers" ("email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") values (9, 'omaccrie8@printfriendly.com', 'Rooney Agerskow', '201 596 4791', '236 909 9731', 'PO Box 52106', 'Olive Maccrie', 'http://dummyimage.com/241x225.png/cc0000/ffffff');
insert into "sellers" ("email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") values (10, 'vserginson9@cbslocal.com', 'Frederich Duligall', '672 416 2546', '823 576 8196', '8th Floor', 'Vanessa Serginson', 'http://dummyimage.com/109x172.png/5fa2dd/ffffff');

-- 5. Insert Data into Products, 10 Products
insert into "products" ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subCategoryId", "sellerId") values ('Men Shirt', 'Displ commnt fx shaft of unsp fibula, 7thD', 'http://dummyimage.com/1071x531.png/ff4444/ffffff', 500, 500, 2, 1, 1);
insert into "products" ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subCategoryId", "sellerId") values ('Women Shirt', 'War op w chem weapons and oth unconvtl warfare, civ, subs', 'http://dummyimage.com/1821x1299.png/dddddd/000000', 100, 95, 2, 2, 2);
insert into "products" ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subCategoryId", "sellerId") values ('Kid Shirt', 'Nondisp fx of shaft of first metacarpal bone, unsp hand', 'http://dummyimage.com/817x460.png/dddddd/000000', 100, 56, 180, 3, 3);
insert into "products" ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subCategoryId", "sellerId") values ('Men Jacket', 'Oth physl fx lower end of l fibula, subs for fx w routn heal', 'http://dummyimage.com/1341x542.png/dddddd/000000', 80, 500, 410, 2, 1, 4);
insert into "products" ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subCategoryId", "sellerId") values ('Women Jacket', 'Poisoning by anticoagulants, undetermined', 'http://dummyimage.com/1170x1100.png/cc0000/ffffff', 400, 54, 56, 2, 5);
insert into "products" ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subCategoryId", "sellerId") values ('Kids Jacket', 'Disp fx of neck of unsp radius, subs for clos fx w malunion', 'http://dummyimage.com/1956x759.png/5fa2dd/ffffff', 210, 100, 390, 72, 3, 6);
insert into "products" ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subCategoryId", "sellerId") values ('Men Cap', 'Malignant neoplasm of urethra', 'http://dummyimage.com/1205x980.png/dddddd/000000', 300, 82, 10, 1, 7);
insert into "products" ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subCategoryId", "sellerId") values ('Women Cap', 'Injury of accessory nerve, left side, subsequent encounter', 'http://dummyimage.com/371x1069.png/5fa2dd/ffffff', 500, 680, 54, 2, 8);
insert into "products" ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subCategoryId", "sellerId") values ('Kids Cap', 'Nondisplaced fracture of trapezoid, unspecified wrist', 'http://dummyimage.com/763x1250.png/5fa2dd/ffffff', 500, 77, 920, 3, 9);
insert into "products" ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subCategoryId", "sellerId") values ('Men Hood', 'Gangrene and necrosis of lung', 'http://dummyimage.com/541x1952.png/cc0000/ffffff', 500, 67, 320, 1, 10);

-- 6. Insert Data into users, 10 users
insert into "users" ("firstName", "lastName", "email", "address", "password") values ('Caryl', 'Crosier', 'ccrosier0@scribd.com', 'Room 664', 'pBQI81fl');
insert into "users" ("firstName", "lastName", "email", "address", "password") values ('Eula', 'Fletham', 'efletham1@fc2.com', 'PO Box 60912', 'NH8DEIjC4B');
insert into "users" ("firstName", "lastName", "email", "address", "password") values ('Bob', 'Hedditch', 'bhedditch2@dailymail.co.uk', 'Room 1339', 'XhcQyyaTH3Pn');
insert into "users" ("firstName", "lastName", "email", "address", "password") values ('Hazel', 'Ware', 'hware3@xrea.com', 'PO Box 7541', 'LPOqGb');
insert into "users" ("firstName", "lastName", "email", "address", "password") values ('Gael', 'Judson', 'gjudson4@nationalgeographic.com', 'Room 276', 'QWU8Di');
insert into "users" ("firstName", "lastName", "email", "address", "password") values ('Luther', 'Quinet', 'lquinet5@addtoany.com', '7th Floor', 'X7VyRMvMIlHO');
insert into "users" ("firstName", "lastName", "email", "address", "password") values ('Felix', 'Bowker', 'fbowker6@vkontakte.ru', '4th Floor', '3Qg9a9kGUF');
insert into "users" ("firstName", "lastName", "email", "address", "password") values ('Graeme', 'Danilchev', 'gdanilchev7@feedburner.com', '3rd Floor', 'Pc3UPUNKb');
insert into "users" ("firstName", "lastName", "email", "address", "password") values ('Salvatore', 'Beckhouse', 'sbeckhouse8@illinois.edu', 'Suite 30', 'ApGDKDIfQpT');
insert into "users" ("firstName", "lastName", "email", "address", "password") values ('Lyndsay', 'Havelin', 'lhavelin9@cdbaby.com', 'Room 1004', 'S2qWXgRfA');

-- 7. Insert Data into orders, 10 Orders
insert into "orders" ("customerId", "paymentId", "date", "time", "orderStatus") values (8, 1, '2022-02-10', '2:34 AM', 'Pending');
insert into "orders" ("customerId", "paymentId", "date", "time", "orderStatus") values (3, 1, '2022-04-18', '2:15 PM', 'Pending');
insert into "orders" ("customerId", "paymentId", "date", "time", "orderStatus") values (4, 1, '2022-01-12', '10:45 AM', 'Pending');
insert into "orders" ("customerId", "paymentId", "date", "time", "orderStatus") values (6, 1, '2022-04-27', '8:52 PM', 'Pending');
insert into "orders" ("customerId", "paymentId", "date", "time", "orderStatus") values (7, 1, '2022-08-30', '4:12 AM', 'Pending');
insert into "orders" ("customerId", "paymentId", "date", "time", "orderStatus") values (9, 1, '2022-08-10', '8:18 AM', 'Pending');
insert into "orders" ("customerId", "paymentId", "date", "time", "orderStatus") values (2, 1, '2022-06-07', '12:01 AM', 'Pending');
insert into "orders" ("customerId", "paymentId", "date", "time", "orderStatus") values (8, 1, '2022-01-28', '7:04 AM', 'Pending');
insert into "orders" ("customerId", "paymentId", "date", "time", "orderStatus") values (7, 1, '2022-04-30', '8:04 PM', 'Pending');
insert into "orders" ("customerId", "paymentId", "date", "time", "orderStatus") values (1, 1, '2022-09-07', '8:17 AM', 'Pending');

-- 8. Insert Data into orderItems, 20 OrderItems
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (1, 1,1,   '478549926',2);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (1, 2,2,   '546485003',2);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (2, 3,2,   '801545114',3);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (2, 4,2,   '634677953',6);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (3, 5,5,   '949558961',4);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (3, 6,6,   '062669249',5);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (4, 7,7,   '831573095',2);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (4, 8,8,   '214845878',5);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (5, 9,9,   '233696638',2);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (5, 10,10, '887155072',3);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (5, 1,1,   '065472761',6);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (6, 2,2,   '480263095',2);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (6, 3,3,   '106536770',6);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (6, 4,4,   '886071237',6);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (7, 5,5,   '261010815',4);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (7, 6,6,   '151782993',7);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (7, 7,7,   '246611889',8);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (8, 1,1,   '560720358',2);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (9, 5,5,   '436206966',5);
insert into "orderItem" ("orderId", "productId", "sellerId", "orderNumber", "quantity") values (10,4,4,   '391539477',3);




ALTER TABLE "users"
ALTER COLUMN "password" TYPE VARCHAR;

--TODO: Add Total Price in orders Table
-- 9. Insert Data into admin, 1 admin
INSERT INTO "admin" ("name","loginId","password" ) VALUES ('Musharib','122345','XHTH67H');



"adminId" SERIAL PRIMARY KEY,
"name" VARCHAR(35) NOT NULL,
"loginId" VARCHAR(35) NOT NULL,
"password" VARCHAR(30) NOT NULL


