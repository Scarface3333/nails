// adminRoutes.js
import { Router } from 'express';
import { createMaster, getAllAppointments, updateAppointmentStatus } from '../controllers/adminController.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();


router.get('/all', authMiddleware,adminMiddleware, getAllAppointments);
router.put('/:id/status', authMiddleware, adminMiddleware, updateAppointmentStatus);
router.post('/create',authMiddleware,adminMiddleware, createMaster)

export default router;
