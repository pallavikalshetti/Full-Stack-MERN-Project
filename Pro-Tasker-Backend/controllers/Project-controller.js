const Project = require('../models/Project-model');
const Task = require('../models/Task-model');

//Get all projects for the logged-in user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch projects' });
  }
};

//Create a new project
exports.createProject = async (req, res) => {
  const { name, description } = req.body;
  try {
    const project = await Project.create({
      name,
      description,
      user: req.user._id,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create project' });
  }
};

//Get a single project (with authorization check)
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (!project.user.equals(req.user._id)) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch project' });
  }
};

// Update project (only owner)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (!project.user.equals(req.user._id))
      return res.status(403).json({ msg: 'Only the user can update' });

    const { name, description } = req.body;
    project.name = name || project.name;
    project.description = description || project.description;
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update project' });
  }
};

// Delete project (only owner)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    if (!project.user.equals(req.user._id))
      return res.status(403).json({ msg: 'Only the owner can delete' });

    // Delete tasks under the project
    await Task.deleteMany({ project: project._id });
    await project.deleteOne();
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete project' });
  }
};

