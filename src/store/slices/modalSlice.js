// modal management slice for Redux store //

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  modalType: null, // 'project', 'skill', 'contact'
  modalData: null, // Données du projet/skill à afficher
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload.type;
      state.modalData = action.payload.data;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;