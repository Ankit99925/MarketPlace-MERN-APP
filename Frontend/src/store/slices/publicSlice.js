import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  filteredProducts: [],
  metadata: {
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 0,
  },
  filters: {
    search: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    subCategory: "",
    minStock: "",
    isFeatured: undefined,
    tags: [],
    minRating: "",
    maxRating: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 9,
  },
  isLoading: false,
  error: null,
};

export const fetchPublicProducts = createAsyncThunk(
  "public/fetchPublicProducts",
  async () => {
    const response = await axios.get("http://localhost:3000/api/public");
    return response.data;
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "public/fetchFilteredProducts",
  async (_, { getState }) => {
    const { filters } = getState().public;
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (Array.isArray(value) && value.length > 0) {
          value.forEach((tag) => params.append(key, tag));
        } else {
          params.append(key, value);
        }
      }
    });

    const response = await axios.get(
      `http://localhost:3000/api/public?${params}`
    );
    return response.data;
  }
);

const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    setLimit: (state, action) => {
      state.filters.limit = action.payload;
      state.filters.page = 1;
    },
    setSorting: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.filters.sortBy = sortBy;
      state.filters.sortOrder = sortOrder;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPublicProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products || [];
        state.error = null;
      })
      .addCase(fetchPublicProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredProducts = action.payload.data.products || [];
        state.metadata = action.payload.data.metadata || {
          total: 0,
          page: state.filters.page,
          limit: state.filters.limit,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
          sortBy: state.filters.sortBy,
          sortOrder: state.filters.sortOrder,
        };
        state.error = null;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.filteredProducts = [];
      });
  },
});

export const {
  setFilter,
  setFilters,
  resetFilters,
  setPage,
  setLimit,
  setSorting,
} = publicSlice.actions;

export default publicSlice.reducer;
