const Task = require("../models/Task.model.js");
const Project = require("../models/Project.model.js");
const handleAddTask = async (req, res) => {
  try {
    const { title, description, assignedTo, project, deadline } = req.body;
    const Taskvalue = await Task.create({
      title,
      description,
      assignedTo,
      project,
      deadline,
    });
    if (Taskvalue) {
      await Project.findByIdAndUpdate(
        project,
        { $push: { tasks: Taskvalue._id } },
        { new: true }
      );
    }
    res.status(201).json({ success: true });
  } catch (error) {
    console.log("Error adding task:", error);
    res.status(500).json({ success: false });
  }
};
const handleGetAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.users.id }).populate(
      "project"
    );
    // console.log(tasks);
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const handleUpdateTaskStatus = async (req, res) => {
  try {
    const data = req.body;
    const updatedtask = await Task.findByIdAndUpdate(
      { _id: data.id },
      { status: data.status },
      { new: true }
    );
    // console.log(updatedtask);
    return res.status(200).json({ success: true, updatedtask });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};
module.exports = { handleAddTask, handleGetAllTasks, handleUpdateTaskStatus };
