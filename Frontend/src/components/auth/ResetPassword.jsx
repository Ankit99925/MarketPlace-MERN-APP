import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ResetPassword = () => {
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:3000/api/auth/resetPassword",
        {
          newPassword: newPasswordRef.current.value,
          confirmNewPassword: confirmNewPasswordRef.current.value,
        },
        { withCredentials: true }
      );
      console.log(data);
      if (data.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setErrors([error.message]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Reset Password
        </h2>
        {errors}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              ref={newPasswordRef}
              type="text"
              name="newPassword"
              id="newPassword"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your New Password"
              required
            />
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              ref={confirmNewPasswordRef}
              type="text"
              name="confirmNewPassword"
              id="confirmNewPassword"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirm your New Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
