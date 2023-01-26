const jwtGenerator = require("../utils/jwtToken/jwtGenerator");
const bcrypt = require("bcrypt");

const {
    API_STATUS_CODES,
    RESPONSE_MESSAGES,
} = require("../constants/constant");


const {
    getProductByIdDB,
    deleteProductByIdDB,
    addProductDB,
    updateProductDB,
    getAllProductsDb,
    isEmailDB,
    signUpDB } = require("../repository/seller.db");
    
    
/* Sellers Controller */

const sellerSignup = async (req, res) => {
    try {


        const { profilePicture, email, fullName, CNIC,
            mobileNumber, address, shopName, cnicPicture, password } = req.body;

        const seller = await isEmailDB({ email });

        if (seller.rows.length !== 0) {
            return res.status(API_STATUS_CODES.ERROR_CODE)
                .send(RESPONSE_MESSAGES.DUPLICATE_ENTRY);
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const hashPassword = await bcrypt.hash(password, salt);

        const newSeller = await signUpDB({

            profilePicture, email, fullName, CNIC,
            mobileNumber, address, shopName, cnicPicture, hashPassword

        });

        //res.json(newSeller.rows);

        const token = jwtGenerator(newSeller.rows[0].sellerId);

        return res.json([token, newSeller.rows]);

    }

    catch (error) {
        console.log(error.message);
        res.status(API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
    }
};


const sellerLogin = async (req, res) => {
    try {
        /* Destructuring Required Data */
        const { email, password } = req.body;

        /**
     * ? Existing User Check
     */
        const seller = await isEmailDB({ email });
        if (seller.rows.length === 0) {
            return res.status(401).send("Seller Does'nt Exit");
        }
        //res.json(seller.rows[0].password)

        /* Compare Passwords */
        const hashedPassword = await bcrypt.compare(
            password,
            seller.rows[0].password
        );


        if (!hashedPassword) {
            return res.status(401).json("Password is incorrect");
        }

        /* JWT Token */

        const token = jwtGenerator(seller.rows[0].sellerId);

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
}


const getSellerProfile = async (req, res) => {

    const sId = req.seller.id;

    try {

        const sellerById = await getSellerByIdDB({ sId });

        res.status(API_STATUS_CODES.SUCCESS).json(sellerById.rows[0]);

    } catch (error) {

        console.log(error.message);
        res.status(API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
    }

}

/* Seller Product Controllers */

const addProduct = async (req, res) => {
    console.log("add", req.body);

    const { name, description, image, unitPrice, stockQuantity, weight,
        subcategoryId, sellerId } = req.body;
    
    try {

        const newProduct = await addProductDB(
            {
                name, description, image, unitPrice, stockQuantity, weight,
                subcategoryId, sellerId
            }
        );


        res.json(newProduct.rows[0])


    } catch (error) {

        res.status(API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);

    }

}


const deleteProduct = async (req, res) => {

    const { id } = req.params;

    const sId = req.seller.id;

    console.log(sId);
    try {

        await deleteProductByIdDB({ id, sId })

        res.json(RESPONSE_MESSAGES.PRODUCT_DELETED);

    } catch (error) {

        console.error(error.message);
        res.status(API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
    }

}


const getAllProduct = async (req, res,) => {

    const sId = req.seller.id;
    console.log(sId);
    try {

        const products = await getAllProductsDb({ sId });

        if (products.rows.length === 0) {
            return res.json("Product Not Found");
        }

        res.json(products.rows);

    } catch (error) {

        console.log(error.message);
        res.status(API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
    }

}


const updateProduct = async (req, res) => {
    const { id } = req.params;

    const sId = req.seller.id;

    try {

        const { name, description, image, unitPrice, stockQuantity, weight,
            subcategoryId, sellerId } = req.body;

        if (`${sId === sellerId}`) {
            await updateProductDB(
                {
                    name, description, image, unitPrice, stockQuantity, weight, subcategoryId, sellerId, id, sId
                }

            );
        } else {
            return res.json("Seller ID or Product Id is Incorrect");
        }

        res.json(RESPONSE_MESSAGES.PRODUCT_UPDATED);

    } catch (error) {

        console.error(error.message);
        res.status(API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);

    }
}


const productDetail = async (req, res) => {

    const { productId } = req.params;

    try {

        const productById = await getProductByIdDB({ productId });

        res.status(API_STATUS_CODES.SUCCESS).json(productById.rows);

    } catch (error) {

        console.log(error.message);
        res.status(API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
    }

}

module.exports = {
    sellerSignup,
    sellerLogin,
    getSellerProfile,
    addProduct,
    deleteProduct,
    getAllProduct,
    updateProduct,
    productDetail
};