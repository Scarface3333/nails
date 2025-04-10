import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthentificated: false,
  token: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload.user;  // Убедись, что ты записываешь только user
      state.isAuthentificated = true;
      state.token = action.payload.token;
    },
    setAuthenticated: (state, action) => {
      state.isAuthentificated = action.payload;
    },
  },
});

export const { logout, setUser, setAuthenticated } = slice.actions;

export const selectIsAuthentificated = (state) =>
  state.auth ? state.auth.isAuthentificated : false; // Исправление: проверка на существование `state.auth`

export default slice.reducer;
