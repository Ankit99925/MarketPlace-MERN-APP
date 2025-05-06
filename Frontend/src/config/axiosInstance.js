import axios from "axios";
import config from "./config";
import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: config.API_URL,
});

let isLoggingOut = false;

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !isLoggingOut) {
      isLoggingOut = true;
      toast.error("Sorry, your plant expired. Seed a new one (login again).");
      store.dispatch(logout());
      setTimeout(() => {
        window.location.href = "/login";
        isLoggingOut = false;
      }, 2000);
    }
    return Promise.reject(error);
  }
);

export default instance;
