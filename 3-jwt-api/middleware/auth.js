const { JsonWebTokenError } = require("jsonwebtoken");
const jsonwebtoken = require("jsonwebtoken");
const { unauthenticatedError } = require("../errors");

const authenticatedMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unauthenticatedError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new unauthenticatedError("Not authorized to access this route");
  }
};

module.exports = authenticatedMiddleware;
