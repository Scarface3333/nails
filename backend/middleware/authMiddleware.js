import jwt from 'jwt-simple';
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];  
  
  if (!token) {
    return res.status(401).json({ message: 'Отсутствует токен' });
  }

  try {
    // Декодируем токен
    const decoded = jwt.decode(token, JWT_SECRET);
    req.user = decoded;  
    next();  
  } catch (error) {
    return res.status(401).json({ message: 'Неверный токен', error: error.message });
  }
};

