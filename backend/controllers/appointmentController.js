// /controllers/appointmentController.js
import pool from '../models/db.js';

export const createAppointment = async (req, res) => {
  const userId = req.user.id;  // id пользователя, полученное через authMiddleware
  const { master_id, date, time } = req.body;
  
  // Проверка времени: допустимый час – от 08:00 до 18:00
  const hour = parseInt(time.split(':')[0]);
  if (hour < 8 || hour > 18) {
    return res.status(400).json({ message: 'Время должно быть в диапазоне от 08:00 до 18:00' });
  }
  
  try {
    // Проверка наличия другой заявки у мастера в выбранную дату и время со статусом new или confirmed
    const conflict = await pool.query(
      `SELECT * FROM appointments WHERE master_id = $1 AND date = $2 AND time = $3 AND status IN ('new', 'confirmed')`,
      [master_id, date, time]
    );
    if (conflict.rows.length > 0) {
      return res.status(400).json({ message: 'Выбранное время недоступно' });
    }
    // Создаём заявку со статусом new
    const newApp = await pool.query(
      `INSERT INTO appointments (user_id, master_id, date, time, status) VALUES ($1, $2, $3, $4, 'new') RETURNING *`,
      [userId, master_id, date, time]
    );
    res.status(201).json(newApp.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка создания заявки', error });
  }
};

export const getUserAppointments = async (req, res) => {
  const userId = req.user.id;
  try {
    const appointments = await pool.query(
      `SELECT a.*, m.name as master_name 
       FROM appointments a 
       LEFT JOIN masters m ON a.master_id = m.id 
       WHERE user_id = $1 
       ORDER BY date, time`,
      [userId]
    );
    res.json(appointments.rows);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения заявок', error });
  }
};

export const getMasters = async (req, res) => {
  try {
    const masters = await pool.query(`SELECT * FROM masters`);
    res.json(masters.rows);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения списка мастеров', error });
  }
};
