const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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

  // numeric filering
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["rating", "price"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        objectQuery[field] = { [operator]: Number(value) };
      }
    });
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

  // limit the products and get by page
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  // final products to get
  const products = await result;

  res.status(200).json({
    products,
    amount: products.length,
  });
};

module.exports = {
  getAllProducts,
};
