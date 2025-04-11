import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from '../header';
import { Container } from '../container';

export const Layout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);  // Лог для отладки

    if (token) {
      setIsLoading(false);
    } else {
      console.log("Redirecting to /auth");
      navigate('/auth');
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col flex-grow">
        <Header />
        <Container>
          <div className="pb-20 p-4 flex-grow">
            <Outlet />
          </div>
        </Container>
      </div>
    </div>
  );
};
