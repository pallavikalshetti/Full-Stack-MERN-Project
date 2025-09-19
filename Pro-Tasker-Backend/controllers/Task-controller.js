const mongoose = require("mongoose");
const Task = require('../models/Task-model');
const Project = require('../models/Project-model');

// Get all tasks for a project
exports.getTasksByProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (!project.user.equals(req.user._id)){
      return res.status(403).json({ msg: 'Access denied' });}

    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch tasks' });
  }
};

//Get a single task (with authorization check)
exports.getTaskById = async (req, res) => {
  const taskId  = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ msg: "Invalid task ID" });
  }

  try {
    const task = await Task.findById(taskId).populate('project');
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    const project = task.project;
    if (!project.user.equals(req.user._id)) {
      return res.status(403).json({ msg: 'Access denied' });
    } 

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch task' });
  }
};

// Create a task under a project
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (!project.user.equals(req.user._id)){
      return res.status(403).json({ msg: 'Not authorized to add task' });}

    const task = await Task.create({
      title,
      description,
      status,
      project: project._id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create task' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    const project = task.project;
    if (!project.user.equals(req.user._id)){
      return res.status(403).json({ msg: 'Access denied' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update task' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('project');
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    const project = task.project;
    if (!project.user.equals(req.user._id))
      return res.status(403).json({ msg: 'Only the owner can delete tasks' });

    await task.deleteOne();
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete task' });
  }
};