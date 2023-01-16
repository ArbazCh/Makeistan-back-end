const { API_STATUS_CODES } = require("./constant");

const CONTROLLER_ERROR = {
  status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
  message: "Internal server error.",
};
const INVALID_REQUEST = {
  status: API_STATUS_CODES.ERROR_CODE,
  message: "Invalid request.",
};
const AUTHORIZATION_FAILED = {
  status: API_STATUS_CODES.AUTHORIZATION_FAILED,
  message: "Authorization failed.",
};
module.exports = {
  CONTROLLER_ERROR,
  INVALID_REQUEST,
  AUTHORIZATION_FAILED,
};
