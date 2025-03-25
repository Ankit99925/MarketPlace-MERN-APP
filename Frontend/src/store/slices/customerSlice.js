import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthHelper } from "../../utils/network-util";

const initialState = {
  products: [],
  cart: [],
  orders: [],
  isLoading: false,
  errorMessages: [],
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

export const placeOrder = createAsyncThunk("customer/placeOrder", async () => {
  const token = AuthHelper();
  const res = await axios.post(
    "http://localhost:3000/api/customer/placeOrders",
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log("Order placed successfully", res.data);
  return res.data;
});

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCustomerData.fulfilled, (state, action) => {
      state.isLoading = false;
      const { products, cart, orders } = action.payload;
      state.products = products;
      state.cart = cart;
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

    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
      state.cart = [];
    });
  },
});

export default customerSlice.reducer;
