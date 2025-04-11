import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Layout } from './components/layout';
import Auth from './pages/Auth';
import { RegisterForm } from './components/register-form';
import { NotFound } from './components/NotFound';
import { Admin } from './pages/Admin';
import { User } from './pages/User';
import CreateMasterForm from './components/createMasterForm';


const container = document.getElementById('root')

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth/>
  },

  {
    path: '/',
    element: <Layout />,
    children: [
      {    
          path: '/admin',
        element: <Admin />, 
       
      },
      {    
        path: '/user',
        element:<User/> 
    }
    ]
  },
 
])

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  );
  
} else {
  throw new Error(
    "Root not found "
  )
}