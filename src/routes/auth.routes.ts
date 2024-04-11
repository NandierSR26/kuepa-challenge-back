import { Router } from 'express'
import { Register } from '../controllers/auth.controller';
import { validateUsername } from '../middlewares/verifyUser';

const router = Router();

router.post('/login');
router.post('/register', [
  validateUsername
], Register);

export default router