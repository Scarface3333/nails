import { useCreateMutation } from '@/app/services/adminApi';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

const CreateMasterForm = () => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [createMaster, { isLoading, isSuccess, isError, error }] = useCreateMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      specialization,
    };

    try {
      const response = await createMaster(userData).unwrap();
      console.log('Мастер создан:', response);
    } catch (err) {
      console.error('Ошибка при создании мастера:', err);
    }
  };

  return (
    <div >
      <Card>
        <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            value={name}
              onChange={(e) => setName(e.target.value)}
              className="m-2"
          />

          <Input
            type="text"
            placeholder="Специализация"
            value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="m-2"
          />
          <Button type="submit" disabled={isLoading} className="m-2">
            {isLoading ? 'Создаю...' : 'Создать'}
          </Button>
          {isSuccess && (
            <div className='text-green-500 text-sm mt-2'>
              Мастер успешно создан
            </div>
          )}
          {isError && (
            <div className="text-red-500 text-sm mt-2">
              Ошибка создания.
            </div>
          )}
        </form>


      </CardContent></Card>
    </div>
  );
};

export default CreateMasterForm;
