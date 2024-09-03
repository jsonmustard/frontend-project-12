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
        state.token = token;
        state.isSignedIn = true;
      }
    },
    logout(state) {
      state.token = null;
      state.isSignedIn = false;
    },
  },
});

export const { loadAuthData, logout } = authSlice.actions;

export default authSlice.reducer;
