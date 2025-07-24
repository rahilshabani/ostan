import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

axios.defaults.baseURL = "https://rahilshabani.pythonanywhere.com/";
axios.defaults.withCredentials = true;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { username, password, rememberMe } = formData;


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrorMessage("");

  try {

    const result = await login(username, password, rememberMe);
    navigate(result.redirect);


  } catch (error) {
    if (error.response) {
      setErrorMessage(error.response.data.detail || "خطای ورود! لطفاً اطلاعات را بررسی کنید.");
    } else {
      setErrorMessage("خطای سرور! لطفاً بعداً تلاش کنید.");
    }
    console.error("Login Error:", error);
  } finally {
    setLoading(false);
  }
};


const login = async (username, password, remember) => {
  const res = await axios.post("/users/login/", {
    username,
    password,
    remember
  });
  return res.data;  
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4" dir="rtl">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">گروه آموزشی کامپیوتر استان مازندران</h2>
        <h2 className="text-2xl font-bold text-center mb-4">ورود به سامانه</h2>

        {errorMessage && <p className="text-center text-red-600 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              نام کاربری:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              رمز عبور:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-700 pr-2">
              مرا به خاطر بسپار
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-2 rounded-md ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
          >
            {loading ? "ورود ..." : "ورود"}
          </button>
        </form>


      </div>
    </div>
  );
};

export default LoginForm;
