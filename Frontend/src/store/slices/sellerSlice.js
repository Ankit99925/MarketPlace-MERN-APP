import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
  errorMessages: [],
};

export const fetchSellerProducts = createAsyncThunk(
  "seller/fetchSellerProducts",
  async (response) => {
    const token = localStorage.getItem("jwtToken");
    const res = await axios("http://localhost:3000/api/seller/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data.product;
    if (res.status === 200) {
      return data;
    } else {
      throw new Error(response);
    }
  }
);

export const editProduct = createAsyncThunk(
  "seller/editProduct",
  async ({ id, formData }) => {
    const token = localStorage.getItem("jwtToken");
    const res = await axios.patch(
      `http://localhost:3000/api/seller/editProduct/${id}`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.status === 201) {
      return res.data.product;
    } else {
      throw new Error(res.statusText || "Failed to edit product");
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      console.log("action.payload.id", action.payload.id);
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload.id
      );
      if (productIndex !== -1) {
        state.products[productIndex] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
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
  },
});

export const { addProduct, deleteProduct, updateProduct } = sellerSlice.actions;
export default sellerSlice.reducer;
