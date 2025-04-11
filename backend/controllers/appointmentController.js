// /controllers/appointmentController.js
import {prisma} from '../prisma/prisma-client.js'



export const createAppointment = async (req, res) => {
  const userId = req.user.id;
  const { masterId, date, time } = req.body;

  // Проверка времени: допустимый час – от 08:00 до 18:00
  const hour = parseInt(time.split(':')[0]);
  if (hour < 8 || hour > 18) {
    return res.status(400).json({ message: 'Время должно быть в диапазоне от 08:00 до 18:00' });
  }

  // Объединяем дату и время в DateTime
  const dateTimeString = `${date}T${time}`; // например: "2025-04-10T10:00"
  const dateTime = new Date(dateTimeString);

  try {
    // Проверка на конфликт по дате/времени
    const conflict = await prisma.appointment.findFirst({
      where: {
        masterId,
        date: dateTime,
        status: {
          in: ['new', 'confirmed'],
        },
      },
    });

    if (conflict) {
      return res.status(400).json({ message: 'Выбранное время недоступно' });
    }

    // Создание заявки
    const newApp = await prisma.appointment.create({
      data: {
        userId,
        masterId,
        date: dateTime,
        status: 'new',
      },
    });

    res.status(201).json(newApp);
  } catch (error) {
    console.error('Ошибка создания заявки:', error);
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
