require("dotenv").config();
require("express-async-errors");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// routers
const authRouter = require("./routes/auth");
const Jobrouter = require("./routes/jobs");
// middleware
const authMiddleware = require("./middleware/authentication");

app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());
// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, Jobrouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 100, // 15 minutes
    max: 100, // llmit each IP to 100 request per windowMS
  })
);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
