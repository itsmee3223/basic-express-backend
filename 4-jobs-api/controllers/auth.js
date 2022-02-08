const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  // can use this or by mongoose
  // const { name, email, password } = req.body;

  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please provide name, email, password");
  // }

  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {};

module.exports = {
  register,
  login,
};
