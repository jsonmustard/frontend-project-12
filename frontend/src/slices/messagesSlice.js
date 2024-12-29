import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action) {
      return { ...state, messages: action.payload.messages };
    },
    addMessage(state, action) {
      const exists = state.messages.some((item) => item.id === action.payload.messages.id);
      if (!exists) {
        return {
          ...state,
          messages: [...state.messages, action.payload.messages],
        };
      }
      return state;
    },
    removeMessagesByChannel(state, action) {
      return {
        ...state,
        messages: state.messages.filter((message) => message.channelId !== action.payload),
      };
    },
  },
});

export const { setMessages, addMessage, removeMessagesByChannel } = messagesSlice.actions;

export default messagesSlice.reducer;
