import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
  channelToRemoveId: null,
  channelToEditId: null,
  isActiveAddChannelModal: false,
  isActiveRemoveChannelModal: false,
  isActiveEditChannelModal: false,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, action) {
      state.channels = action.payload.channels;
    },
    setCurrentChannelId(state, action) {
      state.currentChannelId = action.payload.currentChannelId;
    },
    setChannelToRemoveId(state, action) {
      state.channelToRemoveId = action.payload.channelToRemoveId;
      if (state.currentChannelId === state.channelToRemoveId) {
        state.currentChannelId = 1;
      }
    },
    setChannelToEditId(state, action) {
      state.channelToEditId = action.payload.channelToEditId;
    },
    toggleAddChannelModal(state) {
      state.isActiveAddChannelModal = !state.isActiveAddChannelModal;
    },
    toggleRemoveChannelModal(state, action) {
      state.isActiveRemoveChannelModal = !state.isActiveRemoveChannelModal;
      state.channelToRemoveId = action.payload || null;
    },
    toggleEditChannelModal(state, action) {
      state.isActiveEditChannelModal = !state.isActiveEditChannelModal;
      state.channelToEditId = action.payload || null;
      console.log(state.isActiveEditChannelModal);
    },
    addChannel(state, action) {
      const newChannel = action.payload.channels;
      const exists = state.channels.some(
        (channel) => channel.id === newChannel.id,
      );
      if (!exists) {
        state.channels = [...state.channels, newChannel];
        state.currentChannelId = newChannel.id; // Делаем его текущим
      }
    },
    removeChannel(state, action) {
      state.channels = state.channels.filter(
        (channel) => channel.id !== action.payload,
      );
      state.currentChannelId = 1;
    },
    editChannel(state, action) {
      state.channels = state.channels.map((channel) => (channel.id === action.payload.channels.id ? { ...channel, name: action.payload.channels.name } : channel));
    },
  },
});

export const {
  setChannels,
  setCurrentChannelId,
  setChannelToRemoveId,
  setChannelToEditId,
  toggleAddChannelModal,
  toggleRemoveChannelModal,
  toggleEditChannelModal,
  addChannel,
  removeChannel,
  editChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
