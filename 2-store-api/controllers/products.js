const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const objectQuery = {};

  // find by query in object
  if (featured) {
    objectQuery.featured = featured === "true" ? true : false;
  }

  if (company) {
    objectQuery.company = company;
  }

  if (name) {
    objectQuery.name = { $regex: name, $options: "i" };
  }

  let result = Product.find(objectQuery);

  const products = await result;

  res.status(200).json({
    products,
    amount: products.length,
  });
};

module.exports = {
  getAllProducts,
};
