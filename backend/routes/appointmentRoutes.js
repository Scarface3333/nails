// appointmentRoutes.js
import { Router } from 'express';
import { createAppointment, getUserAppointments, getMasters } from '../controllers/appointmentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create', authMiddleware, createAppointment);
router.get('/get', authMiddleware, getUserAppointments);
router.get('/masters', authMiddleware, getMasters);

export default router;
