import { useState } from "react";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FiMail, FiUser, FiHome, FiPhone, FiLock } from "react-icons/fi";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    school: "",
    phone: "",
    password: "",
    type: "teacher",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.register(userData);

      if (currentUser.status === 201) {
        Swal.fire({
          title: "User Register",
          text: currentUser?.data?.message,
          icon: "success",
        }).then(() => {
          setUserData({
            email: "",
            name: "",
            school: "",
            phone: "",
            password: "",
            type: "teacher",
          });
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Register Failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  const inputs = [
    { name: "email", placeholder: "Email", icon: <FiMail size={20} /> },
    { name: "name", placeholder: "Name", icon: <FiUser size={20} /> },
    { name: "school", placeholder: "School", icon: <FiHome size={20} /> },
    { name: "phone", placeholder: "Phone", icon: <FiPhone size={20} /> },
    { name: "password", placeholder: "Password", icon: <FiLock size={20} />, type: "password" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-red-50">
      <div className="card w-full max-w-md shadow-2xl bg-white p-10 rounded-2xl border border-pink-200">
        <h1 className="text-4xl font-extrabold text-center text-red-600 mb-8">
          Register
        </h1>

        {inputs.map((input) => (
          <div key={input.name} className="form-control w-full mb-5 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400">
              {input.icon}
            </span>
            <input
              type={input.type || "text"}
              name={input.name}
              placeholder={input.placeholder}
              className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-lg transition-shadow duration-300 shadow-sm hover:shadow-md"
              value={userData[input.name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button
          className="btn w-full bg-red-500 hover:bg-pink-400 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={handleSubmit}
        >
          Register
        </button>

        <p className="text-center text-sm text-red-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="underline hover:text-pink-500">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
