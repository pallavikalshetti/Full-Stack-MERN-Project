const express = require('express');
const router = express.Router();
const protect = require('../middleware/Auth-middleware');
const {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  addCollaborator,
} = require('../controllers/Project-controller');

// Protect all routes
router.use(protect);

// router.route('/').get(getProjects).post(createProject);
// router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);
// router.route('/:id/invite').post(addCollaborator);

router.route('/').get(getProjects)
router.route('/').post(createProject)
router.route('/:id').get(getProjectById)
router.route('/:id').put(updateProject)
router.route('/:id').delete(deleteProject);
router.route('/:id/invite').post(addCollaborator);


module.exports = router;