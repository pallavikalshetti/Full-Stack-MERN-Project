const express = require('express');
const router = express.Router();
const protect = require('../middleware/Auth-middleware');
const {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/Task-controller');

// Protect all routes
router.use(protect);

// Tasks for a specific project
router.route('/project/:projectId').get(getTasksByProject)
router.route('/project/:projectId').post(createTask);

// Individual task
router.route('/:id').put(updateTask)
router.route('/:id').delete(deleteTask);

module.exports = router;