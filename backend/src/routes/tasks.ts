import express from 'express';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import { auth } from '../middleware/auth';
import { taskValidation, validate } from '../validators/taskValidator';

const router = express.Router();

router.post('/', auth, taskValidation, validate, createTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

export default router;
