import { prisma } from '../prisma/prisma-client.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';


export const getAllAppointments = [adminMiddleware, async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            fio: true,
            phone: true,
          },
        },
        master: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        { date: 'asc' },
      ],
    });

    const formatted = appointments.map(app => ({
      ...app,
      fio: app.user?.fio || null,
      phone: app.user?.phone || null,
      master_name: app.master?.name || null,
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Ошибка при получении заявок:', error);
    res.status(500).json({ message: 'Ошибка получения заявок', error });
  }
}]

export const updateAppointmentStatus = [adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['confirmed', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Неверный статус' });
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(id) },
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    if (appointment.status !== 'new') {
      return res.status(400).json({ message: 'Можно менять статус только для заявок со статусом "new"' });
    }

    const updatedApp = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.json(updatedApp);
  } catch (error) {
    console.error('Ошибка при обновлении статуса:', error);
    res.status(500).json({ message: 'Ошибка обновления статуса', error });
  }
}
]

export const createMaster = [adminMiddleware, async (req, res) => {
  const { name, specialization } = req.body;

  if (!name || !specialization) {
    return res.status(400).json({ message: 'Имя и специализация обязательны' });
  }

  try {
    const newMaster = await prisma.master.create({
      data: {
        name,
        specialization,
      },
    });

    res.status(201).json(newMaster);
  } catch (error) {
    console.error('Ошибка при создании мастера:', error);
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
}]

