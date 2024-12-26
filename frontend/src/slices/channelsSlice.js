/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-conditional-statement */
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
      return { ...state, channels: action.payload.channels };
    },
    setCurrentChannelId(state, action) {
      return { ...state, currentChannelId: action.payload.currentChannelId };
    },
    setChannelToRemoveId(state, action) {
      const newState = {
        ...state,
        channelToRemoveId: action.payload.channelToRemoveId,
      };
      if (newState.currentChannelId === newState.channelToRemoveId) {
        newState.currentChannelId = 1;
      }
      return newState;
    },
    setChannelToEditId(state, action) {
      return { ...state, channelToEditId: action.payload.channelToEditId };
    },
    toggleAddChannelModal(state) {
      return {
        ...state,
        isActiveAddChannelModal: !state.isActiveAddChannelModal,
      };
    },
    toggleRemoveChannelModal(state, action) {
      return {
        ...state,
        isActiveRemoveChannelModal: !state.isActiveRemoveChannelModal,
        channelToRemoveId: action.payload || null,
      };
    },
    toggleEditChannelModal(state, action) {
      return {
        ...state,
        isActiveEditChannelModal: !state.isActiveEditChannelModal,
        channelToEditId: action.payload || null,
      };
    },
    addChannel(state, action) {
      const newChannel = action.payload.channels;
      const exists = state.channels.some(
        (channel) => channel.id === newChannel.id,
      );
      if (!exists) {
        return {
          ...state,
          channels: [...state.channels, newChannel],
          currentChannelId: newChannel.id,
        };
      }
      return state;
    },
    removeChannel(state, action) {
      return {
        ...state,
        channels: state.channels.filter(
          (channel) => channel.id !== action.payload,
        ),
        currentChannelId: 1,
      };
    },
    editChannel(state, action) {
      return {
        ...state,
        channels: state.channels.map((channel) => (
          channel.id === action.payload.channels.id
            ? { ...channel, name: action.payload.channels.name }
            : channel
        )),
      };
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
