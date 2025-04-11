import React, { useState, useEffect } from 'react';
import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';

export default function Auth() {
  const [selected, setSelected] = useState('login');
  
  return (

      <div className='w-full min-w-80 mx-auto' >
        {selected === 'login' ? (
          <>
            <LoginForm setSelected={setSelected} />
          </>
        ) : (
          <>
            <RegisterForm setSelected={setSelected} />
          </>
        )}
      </div>
  );
}
