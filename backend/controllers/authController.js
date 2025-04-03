// /controllers/authController.js
import pool from '../models/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { fio, phone, login, password, driver_license } = req.body;
  
  // Валидация полей
  const fioRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
  const phoneRegex = /^8\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
  const passwordRegex = /^(?=.*\d).{3,}$/;
  
  if (!fio || !fioRegex.test(fio)) {
    return res.status(400).json({ message: 'Неверный формат ФИО' });
  }
  if (!phone || !phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Неверный формат телефона. Ожидается 8(XXX)-XXX-XX-XX' });
  }
  if (!login) {
    return res.status(400).json({ message: 'Логин обязателен' });
  }
  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Пароль должен содержать минимум 3 символа и хотя бы одну цифру' });
  }
  if (!driver_license) {
    return res.status(400).json({ message: 'Серия и номер водительского удостоверения обязательны' });
  }
  
  try {
    // Проверка уникальности логина
    const userExists = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Логин уже используется' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `INSERT INTO users (fio, phone, login, password, driver_license) VALUES ($1, $2, $3, $4, $5) RETURNING id, fio, phone, login`,
      [fio, phone, login, hashedPassword, driver_license]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};

export const login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
    const user = userResult.rows[0];
    if (!user) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }
    const payload = { id: user.id, login: user.login };
    const token = jwt.encode(payload, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};
