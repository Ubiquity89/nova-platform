import express from 'express';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from '../controllers/projectController';
import { auth } from '../middleware/auth';
import { projectValidation, validate } from '../validators/projectValidator';

const router = express.Router();

router.post('/', auth, projectValidation, validate, createProject);
router.get('/', auth, getProjects);
router.get('/:id', auth, getProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);
router.post('/:id/members', auth, addMember);
router.delete('/:id/members/:userId', auth, removeMember);

export default router;
