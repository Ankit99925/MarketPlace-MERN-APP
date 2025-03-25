import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: localStorage.getItem("jwtToken") ? true : false,
  token: localStorage.getItem("jwtToken") || null,
  userType: localStorage.getItem("userType") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      console.log("State:", state, "Action:", action.payload);
      state.isLoggedIn = true;
      state.jwtToken = action.payload.jwtToken;
      state.userType = action.payload.userType;
      localStorage.setItem("jwtToken", action.payload.jwtToken);
      localStorage.setItem("userType", action.payload.userType);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.jwtToken = null;
      state.userType = null;
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userType");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
