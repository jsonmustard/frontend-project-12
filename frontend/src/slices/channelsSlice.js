import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels(state, action) {
      state.channels = action.payload.channels;
    },
    setCurrentChannelId(state, action) {
      console.log(action.payload);
      state.currentChannelId = action.payload.currentChannelId;
    },
  },
});

export const { getChannels, setCurrentChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
