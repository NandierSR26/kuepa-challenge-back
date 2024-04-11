import { Router } from 'express'
import { Register, login, validateAuth } from '../controllers/auth.controller';
import { validateUsername } from '../middlewares/verifyUser';

const router = Router();

router.get('/validate', validateAuth);

router.post('/login', [], login);

router.post('/register', [
  validateUsername
], Register);

export default router