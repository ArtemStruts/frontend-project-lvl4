import { createSlice } from '@reduxjs/toolkit';
import { setInitialChannelsState, removeChannel } from './channelsSlice.js';

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      const { id } = message;
      const messagesIds = state.messages.map((item) => item.id);
      const newState = state;
      if (!messagesIds.includes(id)) {
        newState.messages = [...state.messages, message];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialChannelsState, (state, { payload: { messages } }) => ({
        messages: [...messages],
      }))
      .addCase(removeChannel, (state, { payload: { id } }) => {
        const newState = state;
        newState.messages = newState.messages.filter((m) => m.channelId !== id);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
