import { createSlice } from '@reduxjs/toolkit';
import { setInitialChannelsState } from './channelsSlice.js';

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialChannelsState, (state, { payload: { messages } }) => ({
        messages: [...messages],
      }));
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
