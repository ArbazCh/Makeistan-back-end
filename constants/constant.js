const API_STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    AUTHORIZATION_FAILED: 401,
    ERROR_CODE: 400,
    INTERNAL_SERVER_ERROR: 500
  };
  const RESPONSE_MESSAGES = {
    PRODUCT_ADDED: "Product Added Successfully",
    SERVER_ERROR: "Something went wrong",
    PRODUCT_DELETED: "Product Deleted Successfully",
    PRODUCT_UPDATED: "Product Updated Successfully",
    DUPLICATE_ENTRY: "E-mail already exists",
    SUCCESS: "Success",
  };
  
  module.exports = { API_STATUS_CODES, RESPONSE_MESSAGES };