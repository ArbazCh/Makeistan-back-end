const {
    API_STATUS_CODES,
    RESPONSE_MESSAGES,
} = require("../constants/constant");


const {
    
    getAllSellersDb

     } = require("../repository/admin.db");
    
    


const getAllSellers = async (req, res) => {


    try {

        const sellers = await getAllSellersDb();

        res.json(sellers.rows);

        console.log(sellers.rows)

    } catch (error) {

        console.log(error.message);
        res.status(API_STATUS_CODES.INTERNAL_SERVER_ERROR).send(RESPONSE_MESSAGES.SERVER_ERROR + error.message);
    }

}


module.exports = {
    
    getAllSellers
    
};