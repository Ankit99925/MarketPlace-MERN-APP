import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthHelper } from "../../utils/network-util";

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
};

export const fetchCustomerData = createAsyncThunk(
  "customer/fetchCustomerData",
  async () => {
    const token = AuthHelper();
    const res = await axios("http://localhost:3000/api/customer/data", {
      headers: { Authorization: `Bearer ${token}` },
    });

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
    const token = AuthHelper();
    const res = await axios.post(
      `http://localhost:3000/api/customer/addToCart/${productId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);
export const removeProductFromCart = createAsyncThunk(
  "customer/removeProductFromCart",
  async (productId) => {
    const token = AuthHelper();
    const res = await axios.delete(
      `http://localhost:3000/api/customer/removeFromCart/${productId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);



export const fetchPublicProducts = createAsyncThunk(
  "customer/fetchPublicProducts",
  async () => {
    const res = await axios("http://localhost:3000/");
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(res.statusText || "Failed to fetch products");
    }
  }
);


const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    sortProducts: (state, action) => {
      const { sortBy, searchTerm } = action.payload;

      let filteredProducts = state.products;

      if (sortBy && sortBy !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === sortBy
        );
      }
      if (searchTerm && searchTerm.trim() !== "") {
        filteredProducts = filteredProducts.filter((product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      state.sortedProducts = filteredProducts;

      if (state.sortedProducts.length === 0) {
        state.errorMessages = ["No products found"];
      } else {
        state.errorMessages = [];
      }
    },
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
      console.log("Customer data fetched successfully", action.payload);
      const { products, cart, orders } = action.payload;
      state.products = products;
      state.cart = cart;
      state.sortedProducts = products;
      state.orders = orders;
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

    builder.addCase(fetchPublicProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPublicProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.sortedProducts = action.payload.products;
    });
    builder.addCase(fetchPublicProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessages = [action.error.message];
    });
  },
});
export const { sortProducts, setCheckoutProducts } = customerSlice.actions;
export default customerSlice.reducer;
