// /middleware/adminMiddleware.js
import jwt from 'jwt-simple';
const JWT_SECRET = process.env.JWT_SECRET;

export const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Отсутствует токен' });
  }
  try {
    const decoded = jwt.decode(token, JWT_SECRET);
    if (!decoded.admin) {
      return res.status(403).json({ message: 'Нет доступа' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Неверный токен', error });
  }
};
