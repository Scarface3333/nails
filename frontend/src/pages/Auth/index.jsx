import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const payload = JSON.parse(atob(token.split('.')[1]));
  //       console.log(payload)
  //       if (payload.admin) {
  //         navigate('/admin');
  //       } else if (payload.id) {
  //         navigate('/user');
  //       }
  //     } catch (e) {
  //       console.error('Ошибка при декодировании токена', e);
  //     }
  //   }
  // }, []);

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        {isLogin ? (
          <>
            <LoginForm />
            <p>Нет аккаунта? <button onClick={() => setIsLogin(false)}>Зарегистрироваться</button></p>
          </>
        ) : (
          <>
            <RegisterForm />
            <p>Уже есть аккаунт? <button onClick={() => setIsLogin(true)}>Войти</button></p>
          </>
        )}
      </div>
    </div>
  );
}
