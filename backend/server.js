// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);

console.log('JWT_SECRET:', process.env.JWT_SECRET);
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Маршруты для пользователей и админа
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

