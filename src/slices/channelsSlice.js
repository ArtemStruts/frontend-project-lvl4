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
  },
});

export const { setInitialChannelsState, setCurrentChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
