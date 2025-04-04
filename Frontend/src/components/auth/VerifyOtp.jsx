import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";
const VerifyOtp = () => {
  const otpRef = useRef();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const cookie = Cookie.get("otpToken");
    console.log(cookie);
    try {
      const data = await axios.post(
        "http://localhost:3000/api/auth/verifyOtp",
        {
          otp: otpRef.current.value,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.status === 200) {
        navigate("/resetPassword");
      }
    } catch (error) {
      setErrors([error.message]);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Verify OTP
        </h2>
        {errors}
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Your 6 Digit OTP
            </label>
            <input
              ref={otpRef}
              type="text"
              id="otp"
              name="otp"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your OTP"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            VerifyOtp
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
