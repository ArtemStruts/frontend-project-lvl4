import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialChannelsState: (state, { payload: { channels, currentChannelId } }) => ({
      channels,
      currentChannelId,
    }),
    setCurrentChannelId: (state, { payload: { id } }) => {
      const newState = state;
      newState.currentChannelId = id;
    },
    addChannel: (state, { payload: { channel } }) => {
      const { id } = channel;
      const newState = state;
      newState.channels = [...state.channels, channel];
      newState.currentChannelId = id;
    },
    removeChannel: (state, { payload: { id } }) => {
      const newState = state;
      newState.channels = state.channels.filter((item) => item.id !== id);
      newState.currentChannelId = 1;
    },
    renameChannel: (state, { payload: { id, name } }) => {
      const channel = state.channels.find((item) => item.id === id);
      channel.name = name;
    },
  },
});

export const {
  setInitialChannelsState,
  setCurrentChannelId,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
