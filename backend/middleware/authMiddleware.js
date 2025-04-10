import jwt from 'jwt-simple';
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  // Получаем токен из заголовков
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];  // Извлекаем токен после "Bearer"
  
  if (!token) {
    return res.status(401).json({ message: 'Отсутствует токен' });
  }

  try {
    // Декодируем токен
    const decoded = jwt.decode(token, JWT_SECRET);
    req.user = decoded;  // Добавляем информацию о пользователе в запрос
    next();  // Переходим к следующему middleware или обработчику
  } catch (error) {
    return res.status(401).json({ message: 'Неверный токен', error: error.message });
  }
};

