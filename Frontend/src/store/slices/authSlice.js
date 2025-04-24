import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: !!localStorage.getItem("jwtToken"),
  jwtToken: localStorage.getItem("jwtToken") || null,
  userType: localStorage.getItem("userType") || null,
  firstName: localStorage.getItem("firstName") || null,
  lastName: localStorage.getItem("lastName") || null,
  profilePicture: localStorage.getItem("profilePicture") || null,
  userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.jwtToken = action.payload.jwtToken;
      state.userType = action.payload.userType;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.profilePicture = action.payload.profilePicture;
      state.userId = action.payload.userId;
      localStorage.setItem("jwtToken", action.payload.jwtToken);
      localStorage.setItem("userType", action.payload.userType);
      localStorage.setItem("firstName", action.payload.firstName);
      localStorage.setItem("userId", action.payload.userId);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.jwtToken = null;
      state.userType = null;
      state.firstName = null;
      state.lastName = null;
      state.profilePicture = null;
      state.userId = null;
      // Clear localStorage
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userType");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("profilePicture");
      localStorage.removeItem("userId");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
