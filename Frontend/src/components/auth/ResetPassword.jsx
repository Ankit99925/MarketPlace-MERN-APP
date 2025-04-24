import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config/config";
const ResetPassword = () => {
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${config.API_URL}/api/auth/resetPassword`,
        {
          newPassword: newPasswordRef.current.value,
          confirmNewPassword: confirmNewPasswordRef.current.value,
        },
        { withCredentials: true }
      );

      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
      setErrors([error.message]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Reset Password
        </h2>
        {errors && (
          <div className="text-red-500 dark:text-red-400 mb-4">{errors}</div>
        )}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              New Password
            </label>
            <input
              ref={newPasswordRef}
              type="password"
              name="newPassword"
              id="newPassword"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                       sm:text-sm"
              placeholder="Enter your New Password"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Confirm New Password
            </label>
            <input
              ref={confirmNewPasswordRef}
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                       sm:text-sm"
              placeholder="Confirm your New Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md 
                     hover:bg-blue-600 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
