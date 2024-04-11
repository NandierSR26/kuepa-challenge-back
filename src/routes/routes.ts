import { Router } from 'express';
import authRoutes from './auth.routes';
import chatRoutes from './chat.routes';
import { validateJWT } from '../middlewares/validateJWT';

const router = Router();

router.use('/api/v1/auth', authRoutes);

router.use('/', validateJWT);
router.use('/api/v1/chat', chatRoutes);

export default router;