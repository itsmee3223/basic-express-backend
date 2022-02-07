const express = require("express");

const connectDB = require("./db/connect");
require("dotenv").config();

const apiRoutes = require("./routes/tasks.routes");

const app = express();

// middleware
app.use(express.static('./public'))
app.use(express.json());

// routes
app.use('/api/v1/tasks', apiRoutes);

const port = 3000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, console.log(`Server is running on port ${port}`));
  })
  .catch((err) => {
    console.error(`Failed connect to DB: ${err}`);
  });
