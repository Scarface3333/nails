import { useCreateAppointmentMutation } from '@/app/services/appointmentApi';
import { Button, Input } from '@heroui/react';
import React, { useState } from 'react';

export const AppointmentCard = ({ master }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [createAppointment, { isLoading, isSuccess, error }] = useCreateAppointmentMutation();

  const handleSubmit = async () => {
    if (!date || !time) return alert('Укажи дату и время');
    try {
      await createAppointment({
        masterId: master.id,
        date,
        time,
      }).unwrap();
      alert('Запись успешна!');
    } catch (err) {
      console.error('Ошибка при записи:', err);
      alert(err.data?.message || 'Что-то пошло не так');
    }
  };

  return (
    <div className="p-4 rounded-2xl shadow-md border w-full max-w-md bg-white space-y-2">
      <p className="text-xl font-semibold">{master.name}</p>
      <p className="text-gray-600">{master.specialization}</p>

      <div className="space-y-2">
        <Input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          type="time"
          className="w-full p-2 border rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
        >
          {isLoading ? 'Запись...' : 'Записаться'}
        </Button>
        {isSuccess && <p className="text-green-600 text-sm">Вы успешно записались</p>}
        {error && <p className="text-red-600 text-sm">{error.data?.message}</p>}
      </div>
    </div>
  );
};
