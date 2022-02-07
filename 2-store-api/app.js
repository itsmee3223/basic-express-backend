const express = require("express");

require("dotenv").config();
// async error
require('express-async-errors')

// middleware import
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productRouter = require("./routes/products");

const port = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
  })
  .catch((err) => {
    console.error(err);
  });
