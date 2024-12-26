/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isSignedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadAuthData: (state) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        return {
          ...state,
          token,
          isSignedIn: true,
        };
      }
      return state;
    },
    logout: (state) => ({
      ...state,
      token: null,
      isSignedIn: false,
    }),
  },
});

export const { loadAuthData, logout } = authSlice.actions;

export default authSlice.reducer;
