import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const { login, user } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(
        logInData.email,
        logInData.password
      );

      if (currentUser.status === 200) {
        Swal.fire({
          title: "User Login",
          text: currentUser?.data?.message,
          icon: "success",
        }).then(() => {
          login(currentUser.data);
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-red-50">
      <div className="card w-full max-w-md shadow-2xl bg-white p-10 rounded-2xl border border-pink-200">
        <h1 className="text-4xl font-extrabold text-center text-red-600 mb-8">
          Login
        </h1>

        {/* Email */}
        <div className="form-control w-full mb-5 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400">
            <FiMail size={20} />
          </span>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-lg transition-shadow duration-300 shadow-sm hover:shadow-md"
            value={logInData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="form-control w-full mb-6 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400">
            <FiLock size={20} />
          </span>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-lg transition-shadow duration-300 shadow-sm hover:shadow-md"
            value={logInData.password}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          className="btn w-full bg-red-500 hover:bg-pink-400 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={handleSubmit}
        >
          Login
        </button>

        {/* Optional: Register link */}
        <p className="text-center text-sm text-red-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="underline hover:text-pink-500">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
