// /controllers/authController.js
import {prisma} from '../prisma/prisma-client.js'
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';


const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  console.log('BODY:', req.body); 
  const { fio, phone, login, password} = req.body;
  
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

  try {
    // Проверка уникальности логина
    const userExists = await prisma.user.findUnique({
      where: { login },
    });
    if (userExists) {
      return res.status(400).json({ message: 'Логин уже используется' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        fio,
        phone,
        login,
        password: hashedPassword,
      },
      select: {
        id: true,
        fio: true,
        phone: true,
        login: true,
      },
    });
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};

export const login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { login },
    });
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
