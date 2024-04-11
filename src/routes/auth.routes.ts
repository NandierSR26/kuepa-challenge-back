import { Router } from 'express'
import { Register, login, validateAuth } from '../controllers/auth.controller';
import { validateUsername } from '../middlewares/verifyUser';
import { validateJWT } from '../middlewares/validateJWT';

const router = Router();



router.post('/login', login);

router.post('/register', [
  validateUsername
], Register);

router.get('/validate', [validateJWT], validateAuth);

export default router