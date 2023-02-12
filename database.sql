-- Create Table
-- category table

CREATE TABLE admin(
"adminId" SERIAL PRIMARY KEY,
"name" VARCHAR(35) NOT NULL,
"loginId" VARCHAR(35) NOT NULL,
"password" VARCHAR(30) NOT NULL
);

CREATE TABLE categories (
  "categoryId" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL
);
-- sub-category table
CREATE TABLE subCategories (
  "subcategoryId" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
-- 	ADD FOREIGN KEY LATER ON.
  "categoryId" INT NOT NULL	
);

CREATE TABLE sellers (
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

CREATE TABLE products (
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


 CREATE TABLE users (
  "customerId" SERIAL PRIMARY KEY,
  "email" VARCHAR(50) NOT NULL,
  "password" VARCHAR(40) NOT NULL,
  "firstName" VARCHAR(25) NOT NULL,
  "lastName" VARCHAR(30) NOT NULL,
  "address" VARCHAR(255) NOT NULL
);

CREATE TABLE paymentMethods(
"paymentId" SERIAL PRIMARY KEY,
"paymentType" VARCHAR(25) NOT NULL
);

CREATE TABLE orders(
"orderId" SERIAL PRIMARY KEY,
--FK
"customerId" INT NOT NULL,
--FK
"paymentId" INT NOT NULL,
"date" DATE NOT NULL,
"time" TIME NOT NULL,
"orderStatus" VARCHAR(30) NOT NULL);

CREATE TABLE orderItem(
"orderitemId" SERIAL PRIMARY KEY,
--FK
"orderId" INT NOT NULL,
--FK
"productId" INT NOT NULL,
--FK
"sellerId" INT NOT NULL,
"orderNumber" VARCHAR NOT NULL,
"quantity" INT NOT NULL);


ALTER TABLE subCategories ADD FOREIGN KEY ("categoryId") REFERENCES categories ("categoryId");
ALTER TABLE products ADD FOREIGN KEY ("subcategoryId") REFERENCES subCategories ("subcategoryId");
ALTER TABLE products ADD FOREIGN KEY ("sellerId") REFERENCES sellers ("sellerId");

ALTER TABLE orders ADD FOREIGN KEY ("customerId") REFERENCES users ("customerId");
ALTER TABLE orders ADD FOREIGN KEY ("paymentId") REFERENCES paymentMethods ("paymentId");
ALTER TABLE orderItem ADD FOREIGN KEY ("sellerId") REFERENCES sellers ("sellerId");
ALTER TABLE orderItem ADD FOREIGN KEY ("orderId") REFERENCES orders ("orderId");
ALTER TABLE orderItem ADD FOREIGN KEY ("productId") REFERENCES products ("productId");

-------------------------------------------INSERT DUMMY DATA------------------------------------------------------------


-- 1. Insert Data into paymentMethods, 1 type
INSERT INTO paymentMethods ("paymentType") VALUES ('COD');

-- 2. Insert Data into Category, 1 Category
INSERT INTO categories ("name") VALUES ('Garments');

-- 3. Insert Data into subCategories, 3 subCategories
INSERT INTO subCategories ("name", "categoryId") VALUES ('Men', 1);
INSERT INTO subCategories ("name", "categoryId") VALUES ('Women', 1);
INSERT INTO subCategories ("name", "categoryId") VALUES ('Kids', 1);

-- 4. Insert Data into sellers, 10 Sellers
INSERT INTO sellers ("profilePicture","email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") VALUES ('http://dummyimage.com/205x187.png/ff4444/ffffff','triggeard0@wikia.com', 'Ivonne D''Ambrosi', '3605926578', '7817250185', 'Apt 1494', 'Tonia Riggeard', 'http://dummyimage.com/205x187.png/ff4444/ffffff');
INSERT INTO sellers ("profilePicture","email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") VALUES ('http://dummyimage.com/205x187.png/ff4444/ffffff','cgookey1@sina.com.cn', 'Pavlov Fraczak', '9758780920', '9601053240', 'Apt 165', 'Chloe Gookey', 'http://dummyimage.com/124x162.png/cc0000/ffffff');
INSERT INTO sellers ("profilePicture","email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") VALUES ('http://dummyimage.com/205x187.png/ff4444/ffffff','acannan2@businesswire.com', 'Sheila Truin', '3891299683', '5403292720', 'PO Box 57046', 'Andrew Cannan', 'http://dummyimage.com/250x174.png/dddddd/000000');
INSERT INTO sellers ("profilePicture","email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") VALUES ('http://dummyimage.com/205x187.png/ff4444/ffffff','kmcconaghy3@auda.org.au', 'Penn Budik', '4701420209', '8617701916', 'Room 1270', 'Kerry McConaghy','http://dummyimage.com/169x111.png/dddddd/000000');
INSERT INTO sellers ("profilePicture","email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") VALUES ('http://dummyimage.com/205x187.png/ff4444/ffffff','ckarpov4@fastcompany.com', 'Wendeline Ciciura', '2332429293', '4365493250', '3rd Floor', 'Cherry Karpov', 'http://dummyimage.com/237x223.png/ff4444/ffffff');
INSERT INTO sellers ("profilePicture","email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") VALUES ('http://dummyimage.com/205x187.png/ff4444/ffffff','tlucken5@scientificamerican.com', 'Sharl Tortice', '2896530438', '9471365134', 'Suite 73', 'Travis Lucken', 'http://dummyimage.com/233x120.png/cc0000/ffffff');
INSERT INTO sellers ("profilePicture","email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") VALUES ('http://dummyimage.com/205x187.png/ff4444/ffffff','oclayborn6@reverbnation.com', 'Sascha Bonwick', '1051394710', '5558042662', 'Apt 586', 'Ogdon Clayborn', 'http://dummyimage.com/136x219.png/dddddd/000000');
INSERT INTO sellers ("profilePicture","email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") VALUES ('http://dummyimage.com/205x187.png/ff4444/ffffff','bseston7@nasa.gov', 'Rora Rake', '8045000925', '4877992535', 'Room 1283', 'Bertrando Seston', 'http://dummyimage.com/161x163.png/ff4444/ffffff');
INSERT INTO sellers ("profilePicture","email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") VALUES ('http://dummyimage.com/205x187.png/ff4444/ffffff','omaccrie8@printfriendly.com', 'Rooney Agerskow', '2015964791', '2369099731', 'PO Box 52106', 'Olive Maccrie', 'http://dummyimage.com/241x225.png/cc0000/ffffff');
INSERT INTO sellers ("profilePicture","email", "fullName", "CNIC", "mobileNumber", "address", "shopName",  "cnicPicture") VALUES ('http://dummyimage.com/205x187.png/ff4444/ffffff','vserginson9@cbslocal.com', 'Frederich Duligall', '6724162546', '8235768196', '8th Floor', 'Vanessa Serginson', 'http://dummyimage.com/109x172.png/5fa2dd/ffffff');


-- 5. Insert Data into Products, 10 Products
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Men Shirt', 'Displ commnt fx shaft of unsp fibula, 7thD', 'http://dummyimage.com/1071x531.png/ff4444/ffffff', 500, 500, 2, 1, 1);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Women Shirt', 'War op w chem weapons and oth unconvtl warfare, civ, subs', 'http://dummyimage.com/1821x1299.png/dddddd/000000', 100, 95, 2, 2, 2);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Kid Shirt', 'Nondisp fx of shaft of first metacarpal bone, unsp hand', 'http://dummyimage.com/817x460.png/dddddd/000000', 100, 56, 180, 3, 3);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Men Jacket', 'Oth physl fx lower end of l fibula, subs for fx w routn heal', 'http://dummyimage.com/1341x542.png/dddddd/000000', 80, 500, 2, 1, 4);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Women Jacket', 'Poisoning by anticoagulants, undetermined', 'http://dummyimage.com/1170x1100.png/cc0000/ffffff', 400, 54, 5, 2, 5);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Kids Jacket', 'Disp fx of neck of unsp radius, subs for clos fx w malunion', 'http://dummyimage.com/1956x759.png/5fa2dd/ffffff', 210, 100, 3, 3, 6);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Men Cap', 'Malignant neoplasm of urethra', 'http://dummyimage.com/1205x980.png/dddddd/000000', 300, 82, 1, 1, 7);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Women Cap', 'Injury of accessory nerve, left side, subsequent encounter', 'http://dummyimage.com/371x1069.png/5fa2dd/ffffff', 500, 680, 3, 2, 8);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Kids Cap', 'Nondisplaced fracture of trapezoid, unspecified wrist', 'http://dummyimage.com/763x1250.png/5fa2dd/ffffff', 500, 77, 3, 3, 9);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Men Hood', 'Gangrene and necrosis of lung', 'http://dummyimage.com/541x1952.png/cc0000/ffffff', 500, 67, 2, 1, 10);

-- 6. Insert Data into users, 10 users
INSERT INTO users ("firstName", "lastName", "email", "address", "password") VALUES ('Caryl', 'Crosier', 'ccrosier0@scribd.com', 'Room 664', 'pBQI81fl');
INSERT INTO users ("firstName", "lastName", "email", "address", "password") VALUES ('Eula', 'Fletham', 'efletham1@fc2.com', 'PO Box 60912', 'NH8DEIjC4B');
INSERT INTO users ("firstName", "lastName", "email", "address", "password") VALUES ('Bob', 'Hedditch', 'bhedditch2@dailymail.co.uk', 'Room 1339', 'XhcQyyaTH3Pn');
INSERT INTO users ("firstName", "lastName", "email", "address", "password") VALUES ('Hazel', 'Ware', 'hware3@xrea.com', 'PO Box 7541', 'LPOqGb');
INSERT INTO users ("firstName", "lastName", "email", "address", "password") VALUES ('Gael', 'Judson', 'gjudson4@nationalgeographic.com', 'Room 276', 'QWU8Di');
INSERT INTO users ("firstName", "lastName", "email", "address", "password") VALUES ('Luther', 'Quinet', 'lquinet5@addtoany.com', '7th Floor', 'X7VyRMvMIlHO');
INSERT INTO users ("firstName", "lastName", "email", "address", "password") VALUES ('Felix', 'Bowker', 'fbowker6@vkontakte.ru', '4th Floor', '3Qg9a9kGUF');
INSERT INTO users ("firstName", "lastName", "email", "address", "password") VALUES ('Graeme', 'Danilchev', 'gdanilchev7@feedburner.com', '3rd Floor', 'Pc3UPUNKb');
INSERT INTO users ("firstName", "lastName", "email", "address", "password") VALUES ('Salvatore', 'Beckhouse', 'sbeckhouse8@illinois.edu', 'Suite 30', 'ApGDKDIfQpT');
INSERT INTO users ("firstName", "lastName", "email", "address", "password") VALUES ('Lyndsay', 'Havelin', 'lhavelin9@cdbaby.com', 'Room 1004', 'S2qWXgRfA');

-- 7. Insert Data into orders, 10 Orders
INSERT INTO orders ("customerId", "paymentId", "date", "time", "orderStatus") VALUES (8, 1, '2022-02-10', '2:34 AM', 'Pending');
INSERT INTO orders ("customerId", "paymentId", "date", "time", "orderStatus") VALUES (3, 1, '2022-04-18', '2:15 PM', 'Pending');
INSERT INTO orders ("customerId", "paymentId", "date", "time", "orderStatus") VALUES (4, 1, '2022-01-12', '10:45 AM', 'Pending');
INSERT INTO orders ("customerId", "paymentId", "date", "time", "orderStatus") VALUES (6, 1, '2022-04-27', '8:52 PM', 'Pending');
INSERT INTO orders ("customerId", "paymentId", "date", "time", "orderStatus") VALUES (7, 1, '2022-08-30', '4:12 AM', 'Pending');
INSERT INTO orders ("customerId", "paymentId", "date", "time", "orderStatus") VALUES (9, 1, '2022-08-10', '8:18 AM', 'Pending');
INSERT INTO orders ("customerId", "paymentId", "date", "time", "orderStatus") VALUES (2, 1, '2022-06-07', '12:01 AM', 'Pending');
INSERT INTO orders ("customerId", "paymentId", "date", "time", "orderStatus") VALUES (8, 1, '2022-01-28', '7:04 AM', 'Pending');
INSERT INTO orders ("customerId", "paymentId", "date", "time", "orderStatus") VALUES (7, 1, '2022-04-30', '8:04 PM', 'Pending');
INSERT INTO orders ("customerId", "paymentId", "date", "time", "orderStatus") VALUES (1, 1, '2022-09-07', '8:17 AM', 'Pending');

-- 8. Insert Data into orderItems, 20 OrderItems
INSERT INTO orderItem ("orderId", "productId", "sellerId", "  orderNumber", "quantity") VALUES (1, 11,1,   '478549926',2);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (1, 12,2,   '546485003',2);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (2, 13,2,   '801545114',3);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (2, 14,2,   '634677953',6);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (3, 15,5,   '949558961',4);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (3, 16,6,   '062669249',5);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (4, 17,7,   '831573095',2);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (4, 18,8,   '214845878',5);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (5, 20,9,   '233696638',2);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (5, 11,10, '887155072',3);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (5, 11,1,   '065472761',6);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (6, 12,2,   '480263095',2);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (6, 13,3,   '106536770',6);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (6, 14,4,   '886071237',6);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (7, 15,5,   '261010815',4);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (7, 16,6,   '151782993',7);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (7, 17,7,   '246611889',8);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (8, 11,1,   '560720358',2);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (9, 15,5,   '436206966',5);
INSERT INTO orderItem ("orderId", "productId", "sellerId", "orderNumber", "quantity") VALUES (10,14,4,   '391539477',3);

--TODO: Add Total Price in orders Table
-- 9. Insert Data into admin, 1 admin
INSERT INTO "admin" ("name","loginId","password" ) VALUES ('Musharib','122345','XHTH67H');


--Alter Commands
ALTER TABLE sellers
ADD "password" VARCHAR;

ALTER TABLE users
ALTER COLUMN "password" TYPE VARCHAR;

ALTER TABLE orders ADD COLUMN "totalPrice" INT;
ALTER TABLE orders DROP COLUMN "time";

INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Groccery', 'Displ commnt fx shaft of unsp fibula, 7thD', 'https://img.freepik.com/free-photo/basket-full-vegetables_1112-316.jpg?w=826&t=st=1675860313~exp=1675860913~hmac=67a63017b5cbd00d10bee1ad68990cbe8fc93efbdfe701e798d27d571f11980b', 500, 500, 2, 4, 1);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('White Shirt', 'War op w chem weapons and oth unconvtl warfare, civ, subs', 'https://img.freepik.com/premium-photo/slim-man-white-t-shirt_53876-159495.jpg?w=900', 100, 95, 2, 5, 2);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Snack', 'Nondisp fx of shaft of first metacarpal bone, unsp hand', 'https://img.freepik.com/premium-photo/brem-khas-solo-brem-madiun-indonesian-traditional-candy-snack-made-from-dried-fermented-sticky-rice-juice_511235-8099.jpg?w=900', 100, 56, 180, 5, 3);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Basket', 'Oth physl fx lower end of l fibula, subs for fx w routn heal', 'https://img.freepik.com/premium-photo/woman-carrying-basket_121111-394.jpg?w=900', 80, 500, 2, 5, 4);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Milk bottle', 'Poisoning by anticoagulants, undetermined', 'https://img.freepik.com/premium-photo/glass-bottle-milk-isolated-dark-brown-wooden-background_76000-3804.jpg?w=900', 400, 54, 5, 4, 5);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Blue Jeans', 'Disp fx of neck of unsp radius, subs for clos fx w malunion', 'https://img.freepik.com/premium-photo/man-brown-sweater-blue-jeans_53876-155989.jpg?w=900', 210, 100, 3, 5, 6);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Black Shirt', 'Malignant neoplasm of urethra', 'https://img.freepik.com/premium-photo/man-wearing-black-t-shirt-with-arms-crossed_53876-144037.jpg?w=900', 300, 82, 1, 6, 7);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Gripper', 'Injury of accessory nerve, left side, subsequent encounter', 'https://img.freepik.com/free-photo/top-view-hand-gripper_23-2148523317.jpg?w=740&t=st=1675860790~exp=1675861390~hmac=f3cc3f0da2c3788cb9ed51511376fd7499746d38e9f6840a599f8d9eb0662337', 500, 680, 3, 6, 8);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Clogs', 'Nondisplaced fracture of trapezoid, unspecified wrist', 'https://img.freepik.com/premium-photo/pair-bright-green-clogs-isolated-white-surface_128711-2458.jpg?w=900', 500, 77, 3, 4, 9);
INSERT INTO products ("name", "description", "image", "unitPrice", "stockQuantity", "weight", "subcategoryId", "sellerId") VALUES ('Clips', 'Gangrene and necrosis of lung', 'https://img.freepik.com/free-photo/top-view-clothes-pins-blue-background_23-2148260855.jpg?w=1060&t=st=1675861160~exp=1675861760~hmac=e3371786c68dfe7469ed97d218624cbec782171e22b66e69fd38775adb61de6c', 500, 67, 2, 4, 10);



-- DELETE FROM products
-- WHERE "productId" IN (1,2,3,4,5,6,7,8,9,10);
 