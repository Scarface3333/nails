// /routes/adminRoutes.js
import { Router } from 'express';
import { adminLogin, getAllAppointments, updateAppointmentStatus } from '../controllers/adminController.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = Router();

// Вход администратора
router.post('/login', adminLogin);

// Получение всех заявок – доступно только администратору
router.get('/appointments', adminMiddleware, getAllAppointments);

// Обновление статуса заявки (только для заявок со статусом "new")
router.put('/appointments/:id/status', adminMiddleware, updateAppointmentStatus);

export default router;
