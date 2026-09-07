import express from 'express';
import { register, login, getMe } from '../controllers/authController';
import { auth } from '../middleware/auth';
import { registerValidation, loginValidation, validate } from '../validators/authValidator';

const router = express.Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', auth, getMe);

export default router;
