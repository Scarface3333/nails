// src/services/Api.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token || localStorage.getItem("token");
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export default baseQuery;

