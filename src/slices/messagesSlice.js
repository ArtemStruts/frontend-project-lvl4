import { createSlice } from '@reduxjs/toolkit';
import { setInitialChannelsState } from './channelsSlice.js';

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setInitialChannelsState, (state, { payload: { messages } }) => ({
        messages: [...messages],
      }));
  },
});

export default messagesSlice.reducer;
