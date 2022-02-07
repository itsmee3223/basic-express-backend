const express = require("express");

const productController = require("../controllers/products");

const router = express.Router();

router.route("/").get(productController.getAllProducts);

module.exports = router;
