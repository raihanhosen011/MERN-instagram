// external import
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// internal imports 
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const postRouter = require("./router/postRouter");
const commentRouter = require("./router/commentRouter");
const notificationRouter = require('./router/notificationRouter')
const messageRouter = require('./router/messageRouter')

const SocketServer = require('./SocketServer')

const app = express();
dotenv.config();

app.use(cors());

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");

// connect database
mongoose
  .connect(process.env.MONGOOSE_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database is running..."))
  .catch((err) => console.log("something error when you connect database"));

// socket io
const http = require("http").createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"]
  }
})

io.on("connection", (socket) => SocketServer(socket))

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
app.use("/api/", notificationRouter);
app.use("/api/", messageRouter);

// not found handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// app listen
http.listen(process.env.PORT, () =>
  console.log(`app listen on port ${process.env.PORT}`)
);
