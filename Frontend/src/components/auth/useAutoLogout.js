import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice"; // adjust path as needed
import { toast } from "react-toastify";

// This is a custom hook!
function useAutoLogout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (e) {
      dispatch(logout());
      return;
    }

    const expiry = decoded.exp * 1000;
    const timeUntilExpiry = expiry - Date.now();

    if (timeUntilExpiry <= 0) {
      dispatch(logout());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(logout());
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
    }, timeUntilExpiry);

    return () => clearTimeout(timer);
  }, [dispatch]);
}

export default useAutoLogout;
