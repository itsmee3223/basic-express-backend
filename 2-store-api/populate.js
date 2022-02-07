require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

connectDB(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connnected to DB...");
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success");
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Error connecting: ${err}`);
    process.exit(1);
  });
