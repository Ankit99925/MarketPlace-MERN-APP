import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axiosInstance";
const initialState = {
  products: [],
  isLoading: false,
  errorMessages: [],
  orders: [],
  updatingOrderId: null,
  error: null,
  profile: {
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    isEmailVerified: false,
    userType: "",
    googleId: "",
  },
};

export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchSellerProfile",
  async (userId) => {
    try {
      const res = await axios.get(`/api/seller/profile/${userId}`);
      const data = res.data;
      if (res.status === 200) {
        return data;
      }
    } catch (error) {
      throw error || "Failed to fetch seller profile";
    }
  }
);

export const updateSellerProfile = createAsyncThunk(
  "seller/updateSellerProfile",
  async ({ userId, formData }) => {
    const res = await axios.patch(
      `/api/seller/updateProfile/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(res.statusText || "Failed to update seller profile");
    }
  }
);
export const fetchSellerProducts = createAsyncThunk(
  "seller/fetchSellerProducts",
  async (response) => {
    const res = await axios(`/api/seller/products`);
    const data = res.data.product;
    if (res.status === 200) {
      return data;
    } else {
      throw new Error(response);
    }
  }
);

export const fetchSellerOrders = createAsyncThunk(
  "seller/fetchSellerOrders",
  async () => {
    try {
      const res = await axios.get(`/api/seller/orders`);

      const data = res.data.orders;

      if (res.status === 200) {
        return data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const updateOrderDeliveryStatus = createAsyncThunk(
  "seller/updateOrderDeliveryStatus",
  async ({ orderId, status }) => {
    const res = await axios.patch(`/api/seller/updateOrderStatus/${orderId}`, {
      status,
    });
    if (res.status === 200) {
      return res.data.order;
    } else {
      throw new Error(res.statusText || "Failed to update order status");
    }
  }
);

export const createProduct = createAsyncThunk(
  "seller/createProduct",
  async (data) => {
    const res = await axios.post(`/api/seller/createProduct`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 201) {
      return res.data.product;
    } else {
      throw new Error(res.statusText || "Failed to create product");
    }
  }
);

export const editProduct = createAsyncThunk(
  "seller/editProduct",
  async ({ id, formData }) => {
    const res = await axios.patch(`/api/seller/editProduct/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.status === 201) {
      return res.data.product;
    } else {
      throw new Error(res.statusText || "Failed to edit product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "seller/deleteProduct",
  async (id) => {
    const res = await axios.delete(`/api/seller/deleteProduct/${id}`);
    if (res.status === 200) {
      return id;
    } else {
      throw new Error(res.statusText || "Failed to delete product");
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellerProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchSellerProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessages = [action.error.message];
    });
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessages = [action.error.message];
    });
    builder.addCase(editProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessages = [action.error.message];
    });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessages = [action.error.message];
      });
    builder.addCase(fetchSellerOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSellerOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchSellerOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessages = [action.error.message];
    });
    builder
      .addCase(updateOrderDeliveryStatus.pending, (state, action) => {
        state.updatingOrderId = action.meta.arg.orderId;
        state.error = null;
      })
      .addCase(updateOrderDeliveryStatus.fulfilled, (state, action) => {
        const { orderId } = action.meta.arg;
        const orderIndex = state.orders.findIndex(
          (order) => order._id === orderId
        );

        if (orderIndex !== -1) {
          state.orders[orderIndex] = {
            ...state.orders[orderIndex],
            status: action.payload.status,
            updatedAt: action.payload.updatedAt,
          };
        }
        state.updatingOrderId = null;
        state.error = null;
      })
      .addCase(updateOrderDeliveryStatus.rejected, (state, action) => {
        state.updatingOrderId = null;
        state.error = action.error.message;
      });
    builder.addCase(fetchSellerProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSellerProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(fetchSellerProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessages = [action.error.message];
    });
    builder.addCase(updateSellerProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateSellerProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(updateSellerProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessages = [action.error.message];
    });
  },
});

export default sellerSlice.reducer;
