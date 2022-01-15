// external import
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");

const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const commentRouter = require("./router/commentRouter");

const app = express();
dotenv.config();

app.use(cors());

// connect database
mongoose
  .connect(process.env.MONGOOSE_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database is running..."))
  .catch((err) => console.log("something error when you connect database"));

// request parser
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(process.env.COOKIE_SECRET),
]);

// set static file
app.use(express.static(`${__dirname}/../public/`));

// routing set-up
app.use("/api/", authRouter);
app.use("/api/", userRouter);
app.use("/api/", postRouter);
app.use("/api/", commentRouter);

// not found handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// app listen
app.listen(process.env.PORT, () =>
  console.log(`app listen on port ${process.env.PORT}`)
);
