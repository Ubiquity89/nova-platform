import express from 'express';
import { getUsers, getUser, updateProfile } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.put('/profile', auth, updateProfile);

export default router;
