import { Router } from 'express';
import authRoutes from './auth.routes';
import chatRoutes from './chat.routes';

const router = Router();

router.use('/api/v1/auth', authRoutes);

router.use('/api/v1/chat', chatRoutes);

export default router;