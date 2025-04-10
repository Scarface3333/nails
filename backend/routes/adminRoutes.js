// adminRoutes.js
import { Router } from 'express';
import { adminLogin, getAllAppointments, updateAppointmentStatus } from '../controllers/adminController.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = Router();

router.post('/login', adminLogin);
router.get('/appointments', adminMiddleware, getAllAppointments);
router.put('/appointments/:id/status', adminMiddleware, updateAppointmentStatus);

export default router;
