const express = require("express");
const checkAUthenticationCookie = require("../Middleware/Authentication middleware");
const {
  handleAddTask,
  handleGetAllTasks,
  handleUpdateTaskStatus,
} = require("../Controllers/Task.controller");
const Router = express.Router();
Router.post("/addTask", handleAddTask);
Router.get(
  "/getAllTask",
  checkAUthenticationCookie("usertoken"),
  handleGetAllTasks
);
Router.post("/updateTaskStatus", handleUpdateTaskStatus);
module.exports = Router;
