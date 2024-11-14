import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload.messages;
    },
    addMessage(state, action) {
      const exists = state.messages.some((item) => item.id === action.payload.messages.id);
      if (!exists) {
        state.messages = [...state.messages, action.payload.messages];
      }
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
