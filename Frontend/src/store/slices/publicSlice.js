import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const fetchPublicProducts = createAsyncThunk(
  "public/fetchPublicProducts",
  async (category) => {
    const response = await axios.get(
      `http://localhost:3000/api/public/${category}`
    );

    return response.data;
  }
);

const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    setproducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPublicProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPublicProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
    });
    builder.addCase(fetchPublicProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setproducts } = publicSlice.actions;
export default publicSlice.reducer;
