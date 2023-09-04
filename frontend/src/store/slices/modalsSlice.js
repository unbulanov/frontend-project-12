import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.id;
    },
    closeModal: (state) => {
      state.type = null;
      state.channelId = null;
    },
  },
});

export const getModalType = (state) => state.modal.type;
export const getChannelId = (state) => state.modal.channelId;
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;