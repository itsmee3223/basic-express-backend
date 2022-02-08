const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  // can use this or by mongoose
  // if (!name || !email || !password) {
  //   throw new BadRequestError("Please provide name, email, password");
  // }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {};

module.exports = {
  register,
  login,
};
