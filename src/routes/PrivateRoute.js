// src/routes/PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null); // null = در حال بررسی

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("/users/profile/");
        setAuthorized(true);
      } catch (err) {
        try {
          await axios.post("/users/refresh/");
          const res = await axios.get("/users/profile/");
          if (res.status === 200) setAuthorized(true);
          else throw new Error("Unauthorized");
        } catch {
          setAuthorized(false);
        }
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) {
    return <div className="text-center p-8">در حال بررسی احراز هویت...</div>;
  }

  return authorized ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
