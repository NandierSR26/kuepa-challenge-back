import { Router } from 'express'
import { Register } from '../controllers/auth.controller';

const router = Router();

router.post('/login');
router.post('/register', Register);

export default router