const Project = require("../models/Project.model.js");
const Task = require("../models/Task.model.js");
const handleAddProject = async (req, res) => {
  try {
    const data = req.body;
    await Project.create({
      name: data.name,
      description: data.description,
      createdBy: req.users.id,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const handleAllProjects = async (req, res) => {
  try {
    const Projects = await Project.find({ createdBy: req.users.id });
    return res.status(200).json({ success: true, Projects });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const handleSinglePoject = async (req, res) => {
  try {
    const singleProject = await Project.findOne({ _id: req.params.id })
      .populate({
        path: "tasks",
        populate: {
          path: "assignedTo",
          model: "User",
        },
      })
      .exec();
    // console.log(singleProject);
    res.status(200).json({ success: true, singleProject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};

const handleDeleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    // console.log(id);
    await Project.findByIdAndDelete(id);
    await Task.deleteMany({ project: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};
module.exports = {
  handleAddProject,
  handleAllProjects,
  handleSinglePoject,
  handleDeleteProject,
};
