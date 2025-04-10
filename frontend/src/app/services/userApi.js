import { BASE_URL } from '@/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/auth` }), 
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
