import { Router } from 'express';
import { userLogin, userSignup } from '../controllers/user.js';
const router = Router();
router.post('/signup', userSignup);
router.post('/login', userLogin);

export default router;
