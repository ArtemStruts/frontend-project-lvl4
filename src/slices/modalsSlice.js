import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    type: null,
    isOpen: false,
    channelId: null,
    channelName: null,
  },
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload: { type, id = null, name = null } }) => ({
      ...state,
      type,
      isOpen: true,
      channelId: id,
      channelName: name,
    }),
    hideModal: () => ({
      ...initialState,
    }),
  },
});

export const { showModal, hideModal } = modalsSlice.actions;

export default modalsSlice.reducer;
