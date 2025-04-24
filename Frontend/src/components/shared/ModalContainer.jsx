import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, setModalLoading } from "../../store/slices/modalSlice";
import ConfirmationModal from "./ConfirmationModal";
import { modalActionHandler } from "../../utils/modalActionHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ModalContainer = () => {
  const { isOpen, config, isLoading } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    if (isLoading) return; // Prevent closing while loading
    dispatch(closeModal());
  };

  const handleConfirm = async () => {
    try {
      const { type, actionPayload } = config;
      const action = modalActionHandler[type];

      if (!action) {
        toast.error("Invalid action type");
        handleClose();
        return;
      }

      dispatch(setModalLoading(true));

      const success = await action(actionPayload);

      dispatch(setModalLoading(false));

      if (success) {
        toast.success(
          type === "edit"
            ? "Product updated successfully"
            : "Product deleted successfully"
        );
        dispatch(closeModal());

        // If it's a delete or edit action, navigate back to products
        if (type === "delete" || type === "edit") {
          navigate("/sellerDashboard/products");
        }
      }
    } catch (error) {
      console.error("Error in handleConfirm:", error);
      toast.error("Operation failed: " + (error.message || "Unknown error"));
      dispatch(setModalLoading(false));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <ConfirmationModal
        isOpen={true}
        title={config.title}
        onConfirm={handleConfirm}
        onClose={handleClose}
        message={config.message}
        confirmButtonText={config.confirmButtonText}
        cancelButtonText={config.cancelButtonText}
        type={config.type}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ModalContainer;
