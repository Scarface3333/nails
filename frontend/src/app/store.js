import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './services/userApi';
import { adminApi } from './services/adminApi';
import { appointmentApi } from './services/appointmentApi';


export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer, 
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, adminApi.middleware,appointmentApi.middleware), // Добавляем middleware adminApi
});
