import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isLoading: false,
  config: {
    title: "",
    message: "",
    confirmButtonText: "",
    cancelButtonText: "",
    type: "",
    actionPayload: null,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.config = action.payload;
      state.isLoading = false;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.config = initialState.config;
      state.isLoading = false;
    },
    setModalLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalLoading } = modalSlice.actions;
export default modalSlice.reducer;
