import React from 'react';
import { useAllQuery, useStatusMutation } from '@/app/services/adminApi';
import { Button, Select, SelectItem } from '@heroui/react';

const statusOptions = ['new', 'confirmed', 'canceled'];

export const AllAppointmentsAdmin = () => {
  const { data: appointments, isLoading, isError, error } = useAllQuery();
  const [updateStatus, { isLoading: updating }] = useStatusMutation();

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      alert('Статус успешно обновлён');
    } catch (err) {
      console.error('Ошибка обновления статуса:', err);
      alert(err.data?.message || 'Ошибка при обновлении статуса');
    }
  };

  if (isLoading) return <p>Загрузка заявок...</p>;
  if (isError) return <p className="text-red-600">Ошибка: {error?.data?.message || 'Не удалось загрузить заявки'}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-2">Все заявки</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">Заявок пока нет</p>
      ) : (
        appointments.map((app) => (
          <div
            key={app.id}
            className="p-4 border rounded-2xl shadow-sm bg-white flex justify-between items-center gap-4"
          >
            <div className="flex-1">
              <p className="font-semibold">{app.fio || 'Без имени'} ({app.phone || '—'})</p>
              <p className="text-sm text-gray-600">
                Мастер: {app.master_name || '—'}<br />
                Дата: {new Date(app.date).toLocaleDateString()} в {new Date(app.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            <Select
              size="sm"
              className="w-40"
              defaultSelectedKeys={[app.status]}
              onChange={(e) => handleStatusChange(app.id, e.target.value)}
              isDisabled={updating}
            >
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === 'new'
                    ? 'Новая'
                    : status === 'confirmed'
                    ? 'Подтверждена'
                    : 'Отменена'}
                </SelectItem>
              ))}
            </Select>
          </div>
        ))
      )}
    </div>
  );
};
