import React, { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axiosInstance";

const LoginForm = () => {
const navigate = useNavigate();
const [hasCheckedLogin, setHasCheckedLogin] = useState(false);
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
const [manualLogin, setManualLogin] = useState(false);


useEffect(() => {
  if (hasCheckedLogin || manualLogin) return;

  const checkLoggedIn = async () => {
    try {
      const res = await axios.get("/users/me/");
      if (res.status === 200 && res.data?.redirect && res.data.redirect !== "none") {
        console.log("redirecting to:", res.data.redirect);
        navigate(res.data.redirect);
      }
    } catch (err) {
      console.log("Not logged in or unauthorized");
    } finally {
      setHasCheckedLogin(true);
    }
  };

  checkLoggedIn();
}, [hasCheckedLogin, manualLogin, navigate]);




  const LOGO_URL = `${API_BASE_URL.replace("/api", "")}media/base/logo.png`;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { username, password, rememberMe } = formData;



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
    setManualLogin(true);
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
  remember,
});

if (remember) {
  localStorage.setItem("access_token", res.data.access);
  localStorage.setItem("refresh_token", res.data.refresh);
} else {
  sessionStorage.setItem("access_token", res.data.access);
  sessionStorage.setItem("refresh_token", res.data.refresh);
}


  return res.data;  
};



  return (
    <div className="flex items-center justify-center min-h-screen background p-4" dir="rtl">
      <header className="menu-gradient fixed top-0 w-full z-50 bg-opacity-90 backdrop-blur-md px-6 py-4 flex flex-row-reverse justify-between items-center shadow-lg">
        <div className="flex items-center flex-row-reverse space-x-3">
          <img
            src={LOGO_URL}
            alt="لوگو"
            className="w-10 h-10 rounded-full"
          /><a href='/'>
          <h1 className="text-xl font-bold text-white">گروه کامپیوتر استان مازندران</h1>
          </a>
        </div>
        <nav className="hidden md:flex space-x-6 space-x-reverse text-white">
          <a href="/" className="hover:text-yellow-300 transition">خانه</a>
          <a href="#" className="hover:text-yellow-300 transition font-bold">پنل کاربری</a>
          <a href="#" className="hover:text-yellow-300 transition">درباره ما</a>
        </nav>
      </header>

      <div className="menu-gradient p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center mb-4">گروه آموزشی کامپیوتر استان مازندران</h2>
        <h2 className="text-2xl font-bold text-center mb-4">ورود به سامانه</h2>

        {errorMessage && <p className="text-center text-red-600 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
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
            <label htmlFor="password" className="block text-sm font-medium">
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
            <label htmlFor="rememberMe" className="text-sm pr-2">
              مرا به خاطر بسپار
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-2 rounded-md ${loading ? "bg-gray-400" : "light-button"}`}
          >
            {loading ? "ورود ..." : "ورود"}
          </button>
        </form>


      </div>
    </div>
  );
};

export default LoginForm;
