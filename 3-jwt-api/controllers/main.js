// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboa

const jsonwebtoken = require("jsonwebtoken");
const { badRequestError } = require("../errors");

const login = async (req, res) => {
  const {username, password} = req.body

  if(!username && !password){
    throw new badRequestError('Please provide email and password')
  }

  // in real world app id must be provided by DB
  const id = new Date().getDate()

  // jusing small payload better for user with slow internet
  // in production using long, complex and unguessable string value

  const token = jsonwebtoken.sign({id, username}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })

  res.status(200).json({msg: 'user created', token})

};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Her isi you lucky number ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};