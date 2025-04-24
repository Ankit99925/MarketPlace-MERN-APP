import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import config from "../../config/config";
const Signup = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const userTypeRef = useRef();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post(`${config.API_URL}/api/auth/signup/`, {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
        userType: userTypeRef.current.value,
      })
      .then((data) => {
        if (data.status === 201) {
          toast.success("Account created successfully! Please log in.");
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          toast.error("Failed to create account");
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Signup
        </h2>
        {errors.map((err, index) => (
          <div key={index} className="text-red-500 dark:text-red-400">
            {err.msg}
          </div>
        ))}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              First Name
            </label>
            <input
              ref={firstNameRef}
              type="text"
              id="firstname"
              name="firstname"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                       sm:text-sm"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Last Name
            </label>
            <input
              ref={lastNameRef}
              type="text"
              id="lastname"
              name="lastname"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                       sm:text-sm"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                       sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                       sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Confirm Password
            </label>
            <input
              ref={confirmPasswordRef}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                       sm:text-sm"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="usertype"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              User Type
            </label>
            <select
              ref={userTypeRef}
              id="usertype"
              name="usertype"
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 
                       dark:bg-gray-700 dark:text-white
                       sm:text-sm"
              required
            >
              <option value="Customer">Customer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md 
                     hover:bg-blue-600 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
