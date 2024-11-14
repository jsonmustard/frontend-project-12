import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      state.channels = action.payload.channels;
    },
    setCurrentChannelId(state, action) {
      console.log(action.payload);
      state.currentChannelId = action.payload.currentChannelId;
    },
  },
});

export const { setChannels, setCurrentChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
