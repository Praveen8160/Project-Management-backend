require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3030;

const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // If you are sending cookies or authorization headers
  })
);

app.use(cookieParser());
app.use(express.json()); //for accept json data
app.use(express.urlencoded({ extended: false }));

//connection
const DatabaseConnection = require("./Connection.js");
DatabaseConnection(process.env.mongo);

//Routers
const userRouter = require("./Router/User.Router.js");
const authRouter = require("./Router/Authentication.router.js");
const projectRouter = require("./Router/Project.Router.js");
const taskRouter = require("./Router/Task.Router.js");
app.use("/User", userRouter);
app.use("/Authentication", authRouter);
app.use("/Project", projectRouter);
app.use("/Task", taskRouter);

app.listen(port, () =>
  console.log(`server started on http://localhost:${port}`)
);
