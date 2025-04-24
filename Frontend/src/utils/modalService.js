import { store } from "../store/store";
import { openModal } from "../store/slices/modalSlice";

export const modalConfigs = {
  edit: (actionPayload) => ({
    type: "edit",
    title: "Edit Product",
    message: "Are you sure you want to save changes?",
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    actionPayload: actionPayload,
  }),
  delete: (actionPayload) => ({
    type: "delete",
    title: "Delete Product",
    message: "Are you sure you want to delete this product?",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
    actionPayload: actionPayload,
  }),
};

export const modalService = (config) => {
  store.dispatch(openModal(config));
};
