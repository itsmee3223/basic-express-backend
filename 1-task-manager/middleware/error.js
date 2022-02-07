const { CustomAPIError } = require("../utils/custom-error");
const errorHanlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: err });
};

module.exports = errorHanlerMiddleware;
