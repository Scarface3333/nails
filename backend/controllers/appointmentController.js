// /controllers/appointmentController.js
import {prisma} from '../prisma/prisma-client.js'



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
    const conflict = await prisma.appointment.findFirst({
      where: {
        masterId: master_id,
        date,
        time,
        status: {
          in: ['new', 'confirmed'],
        },
      },
    });
    if (conflict) {
      return res.status(400).json({ message: 'Выбранное время недоступно' });
    }
    
    // Создаём заявку со статусом new
    const newApp = await prisma.appointment.create({
      data: {
        userId,
        masterId: master_id,
        date,
        time,
        status: 'new',
      },
    });
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка создания заявки', error });
  }
};

export const getUserAppointments = async (req, res) => {
  const userId = req.user.id;
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
      },
      include: {
        master: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
        time: 'asc',
      },
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения заявок', error });
  }
};

export const getMasters = async (req, res) => {
  try {
    const masters = await prisma.master.findMany();
    res.json(masters);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения списка мастеров', error });
  }
};
