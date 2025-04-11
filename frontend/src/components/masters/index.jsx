import { useGetMastersQuery } from '@/app/services/appointmentApi';
import React from 'react';

const MasterList = () => {
  const { data: masters, isLoading, isError } = useGetMastersQuery();

  if (isLoading) return <p>Загрузка мастеров...</p>;
  if (isError) return <p>Ошибка при загрузке мастеров</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Наши мастера</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {masters.map((master) => (
          <li
            key={master.id}
            className="p-4 bg-white rounded-xl shadow border hover:shadow-lg transition"
          >
            <p className="flex flex-col text-lg font-medium ">   <span>{master.name}</span>
            <span>{master.specialization}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MasterList;
