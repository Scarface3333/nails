// /controllers/adminController.js
import pool from '../models/db.js';
import jwt from 'jwt-simple';

const JWT_SECRET = process.env.JWT_SECRET;

export const adminLogin = async (req, res) => {
  const { login, password } = req.body;
  if (login === 'beauty' && password === 'pass') {
    // Формируем токен с флагом администратора
    const payload = { admin: true };
    const token = jwt.encode(payload, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Неверные админские данные' });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await pool.query(
      `SELECT a.*, u.fio, u.phone, m.name as master_name 
       FROM appointments a 
       LEFT JOIN users u ON a.user_id = u.id
       LEFT JOIN masters m ON a.master_id = m.id
       ORDER BY a.date, a.time`
    );
    res.json(appointments.rows);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения заявок', error });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  // Разрешены только изменения на confirmed или rejected
  if (!['confirmed', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Неверный статус' });
  }
  try {
    const appointmentRes = await pool.query(`SELECT * FROM appointments WHERE id = $1`, [id]);
    const appointment = appointmentRes.rows[0];
    if (!appointment) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }
    if (appointment.status !== 'new') {
      return res.status(400).json({ message: 'Можно менять статус только для заявок со статусом "new"' });
    }
    const updatedApp = await pool.query(
      `UPDATE appointments SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    res.json(updatedApp.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка обновления статуса', error });
  }
};
