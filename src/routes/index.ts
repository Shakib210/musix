// src/routes/index.ts
import { Router } from 'express';
import userRoutes from '@routes/userRoutes'; 

const router = Router();

// Mount user routes
router.use('/users', userRoutes);

export default router;
