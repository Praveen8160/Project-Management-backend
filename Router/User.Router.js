const express = require("express");
const {
  handelUserSignup,
  handleUserSignin,
  handlegetAllUser,
} = require("../Controllers/User.controller");
const Router = express.Router();

Router.post("/Signup", handelUserSignup);
Router.post("/Signin", handleUserSignin);
Router.get("/allUser", handlegetAllUser);
module.exports = Router;
