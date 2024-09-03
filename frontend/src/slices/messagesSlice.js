import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages(state, action) {
      state.messages = action.payload.messages;
    },
  },
});

export const { getMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
