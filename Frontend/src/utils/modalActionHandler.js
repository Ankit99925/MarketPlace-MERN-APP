import { store } from "../store/store";
import { editProduct, deleteProduct } from "../store/slices/sellerSlice";
import { toast } from "react-toastify";

export const modalActionHandler = {
  edit: async (actionPayload) => {
    try {
      const { id, productData, imageFile } = actionPayload;

      // Create FormData only at API call time
      const formData = new FormData();

      // Process tags if needed
      if (productData.tags && typeof productData.tags === "string") {
        const tagsArray = productData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);

        formData.append("tags", JSON.stringify(tagsArray));
      } else if (Array.isArray(productData.tags)) {
        formData.append("tags", JSON.stringify(productData.tags));
      }

      // Add regular data
      Object.keys(productData).forEach((key) => {
        if (key !== "image" && key !== "tags") {
          formData.append(key, productData[key]);
        }
      });

      // Add image if exists
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const result = await store
        .dispatch(editProduct({ id, formData }))
        .unwrap();

      return !!result;
    } catch (error) {
      throw error;
    }
  },

  delete: async (actionPayload) => {
    try {
      const result = await store
        .dispatch(deleteProduct(actionPayload))
        .unwrap();

      return !!result;
    } catch (error) {
      throw error;
    }
  },
};
