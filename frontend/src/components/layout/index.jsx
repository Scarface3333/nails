import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAuthenticated } from '../userSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { selectIsAuthentificated } from '../userSlice';
import { Header } from '../header';
import { Container } from '../container';

export const Layout = () => {
  // const dispatch = useDispatch();
  // const isAuthenticated = useSelector(selectIsAuthentificated);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');  
  //   if (token) {
  //     dispatch(setAuthenticated(true));
  //   } else {
  //     dispatch(setAuthenticated(false));
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate('/auth');  
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex flex-col flex-grow">
        <Header/>
        <Container>
          <div className="pb-20 p-4 flex-grow">
            <Outlet/>
          </div>
        </Container>
      </div>
    </div>
  );
};
