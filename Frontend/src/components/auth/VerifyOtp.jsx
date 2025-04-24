import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const otpRef = useRef();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/verifyotp",
        {
          otp: otpRef.current.value,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("OTP verified successfully");
      navigate("/resetPassword");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      setErrors([error.message]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Verify OTP
        </h2>
        {errors && (
          <div className="text-red-500 dark:text-red-400 mb-4">{errors}</div>
        )}
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Enter Your 6 Digit OTP
            </label>
            <input
              ref={otpRef}
              type="text"
              id="otp"
              name="otp"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                       sm:text-sm"
              placeholder="Enter your OTP"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md 
                     hover:bg-blue-600 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
