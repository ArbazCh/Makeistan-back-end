const API_STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  AUTHORIZATION_FAILED: 401,
  ERROR_CODE: 400,
  INTERNAL_SERVER_ERROR: 500,
  DUPLICATE_ENTRY: 11000,
};
const RESPONSE_MESSAGES = {
  ORDER_CREATED: "Order Created Successfully",
  SERVER_ERROR: "Something went wrong",
  ORDER_CANCLLED: "Order Canclled Succefully",
  DUPLICATE_ENTRY: "E-mail already exists",
  SUCCESS: "Success",
};

module.exports = { API_STATUS_CODES, RESPONSE_MESSAGES };
