const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
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

  // sort the products
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // select by fields
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }

  const products = await result;

  res.status(200).json({
    products,
    amount: products.length,
  });
};

module.exports = {
  getAllProducts,
};
