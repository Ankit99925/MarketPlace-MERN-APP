import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../config/axiosInstance";

const initialState = {
  products: [],
  cart: [],
  orders: [],
  sortedProducts: [],
  searchTerm: "",
  sortBy: "All",
  isLoading: false,
  errorMessages: [],
  checkoutProducts: [],
  finalPrice: 0,
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

export const fetchCustomerProfile = createAsyncThunk(
  "customer/fetchCustomerProfile",
  async () => {
    const res = await axios.get(`/api/customer/profile`);

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(res.statusText || "Failed to fetch customer profile");
    }
  }
);

export const updateCustomerProfile = createAsyncThunk(
  "customer/updateCustomerProfile",
  async ({ userId, formData }) => {
    try {
      const res = await axios.patch(
        `/api/customer/profile/${userId}`,
        formData,
        {
          encType: "multipart/form-data",
        }
      );
      return res.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to update profile"
      );
    }
  }
);

export const fetchCustomerData = createAsyncThunk(
  "customer/fetchCustomerData",
  async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((item) => params.append(key, item));
        } else {
          params.append(key, value);
        }
      }
    });

    const queryString = params.toString();
    const url = `/api/customer/data${queryString ? `?${queryString}` : ""}`;

    const res = await axios.get(url);

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(res.statusText || "Failed to fetch customer data");
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "customer/addProductToCart",
  async (productId) => {
    const res = await axios.post(
      `/api/customer/addToCart/${productId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);
export const removeProductFromCart = createAsyncThunk(
  "customer/removeProductFromCart",
  async (productId) => {
    const res = await axios.delete(`/api/customer/removeFromCart/${productId}`);
    return res.data;
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    setCheckoutProducts: (state, action) => {
      state.checkoutProducts = action.payload.products;
      state.finalPrice = action.payload.finalPrice;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCustomerData.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.success) {
        const { products, metadata, cart, orders } = action.payload.data;
        state.products = products;
        state.metadata = metadata;
        state.cart = cart;
        state.orders = orders;
        state.sortedProducts = products;
      }
    });
    builder.addCase(fetchCustomerData.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessages = [action.error.message];
    });

    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });

    builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });

    builder.addCase(fetchCustomerProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCustomerProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(fetchCustomerProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessages = [action.error.message];
    });
    builder.addCase(updateCustomerProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCustomerProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    });
    builder.addCase(updateCustomerProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessages = [action.error.message];
    });
  },
});
export const { setCheckoutProducts } = customerSlice.actions;
export default customerSlice.reducer;
