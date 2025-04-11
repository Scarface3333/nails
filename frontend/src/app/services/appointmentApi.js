import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './Api';

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery,
  endpoints: (builder) => ({

    getUserAppointments: builder.query({
      query: () => '/appointments/get',
    }),

    getMasters: builder.query({
      query: () => '/appointments/masters',
    }),

    createAppointment: builder.mutation({
      query: (data) => ({
        url: '/appointments/create',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserAppointmentsQuery,
  useGetMastersQuery,
  useCreateAppointmentMutation,
} = appointmentApi;
