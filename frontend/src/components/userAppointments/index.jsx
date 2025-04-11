import React, { useState } from 'react';
import { useGetUserAppointmentsQuery } from '@/app/services/appointmentApi';
import { Button } from '@heroui/react';
import { useStatusMutation } from '@/app/services/adminApi';

export const UserAppointments = () => {
  const { data: appointments, isLoading, isError, error } = useGetUserAppointmentsQuery();
  const [updateStatus, { isLoading: isUpdating }] = useStatusMutation();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p className="text-red-600">Ошибка: {error?.data?.message || 'Что-то пошло не так'}</p>;

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      alert('Статус успешно обновлён');
    } catch (err) {
      console.error('Ошибка обновления статуса:', err);
      alert(err.data?.message || 'Ошибка при обновлении статуса');
    }
  };

  const handleSelectChange = (e, appId) => {
    handleStatusChange(appId, e.target.value);  
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Мои записи</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">У вас пока нет записей</p>
      ) : (
        appointments.map((app) => (
          <div
            key={app.id}
            className="p-4 border rounded-2xl shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{app.master?.name}</p>
              <p className="text-sm text-gray-600">
                Дата: {new Date(app.date).toLocaleDateString()} <br />
                Время: {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-medium ${
                  app.status === 'confirmed'
                    ? 'text-green-600'
                    : app.status === 'canceled'
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }`}
              >
                {app.status === 'new'
                  ? 'Новая'
                  : app.status === 'confirmed'
                  ? 'Подтверждена'
                  : 'Отменена'}
              </span>

              
              {/* <select
                value={app.status}  
                onChange={(e) => handleSelectChange(e, app.id)}
                disabled={isUpdating || app.status === 'canceled'} 
                className="p-2 border rounded"
              >
                <option value="new">Новая</option>
                <option value="confirmed">Подтверждена</option>
                <option value="canceled">Отменена</option>
              </select> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
