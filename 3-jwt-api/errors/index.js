const badRequestError = require("./bad-request");
const CustomAPIError = require("./custom-error");
const unauthenticatedError = require("./unauthenticated");

module.exports = {
  CustomAPIError,
  badRequestError,
  unauthenticatedError,
};
