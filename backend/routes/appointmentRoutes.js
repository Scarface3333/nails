// /routes/appointmentRoutes.js
import { Router } from 'express';
import { createAppointment, getUserAppointments, getMasters } from '../controllers/appointmentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

// Создание новой заявки (требуется авторизация)
router.post('/', authMiddleware, createAppointment);

// Получение заявок авторизованного пользователя
router.get('/', authMiddleware, getUserAppointments);

// Получение списка мастеров
router.get('/masters', authMiddleware, getMasters);

export default router;
