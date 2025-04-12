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

export const createProduct = createAsyncThunk(
  "seller/createProduct",
  async (data) => {
    const token = localStorage.getItem("jwtToken");
    console.log(data);
    const res = await axios.post(
      "http://localhost:3000/api/seller/createProduct",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.status === 201) {
      console.log("Product created successfully", res);
      return res.data.product;
    } else {
      throw new Error(res.statusText || "Failed to create product");
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
export const deleteProduct = createAsyncThunk(
  "seller/deleteProduct",
  async (id) => {
    const token = localStorage.getItem("jwtToken");
    const res = await axios.delete(
      `http://localhost:3000/api/seller/deleteProduct/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.status === 200) {
      return res.data.product;
    } else {
      throw new Error(res.statusText || "Failed to delete product");
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
    removeProduct: (state, action) => {
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
  },
});

export const { addProduct, removeProduct, updateProduct } = sellerSlice.actions;
export default sellerSlice.reducer;
