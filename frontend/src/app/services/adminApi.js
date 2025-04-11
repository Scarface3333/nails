// src/api/adminApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './Api';


export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQuery, 
  endpoints: (builder) => ({
    all: builder.query({
      query: () => '/admin/all',
    }),

    // Обновление статуса заявки
    status: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
    }),

    // Создание нового мастера
    create: builder.mutation({
      query: (userData) => ({
        url: '/admin/create',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useAllQuery, useStatusMutation, useCreateMutation } = adminApi;
