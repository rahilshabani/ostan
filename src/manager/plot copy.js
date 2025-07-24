import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CityChart({ valueKey = "ataValue", title= "", admin="true" }) {
  const [cities, setCities] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";

  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

    axios.get(`${backendUrl}/users/show/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error("خطا در دریافت شهرستان‌ها", error);
      });
  }, []);

  const changeValue = (userId, index, step) => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    const currentValue = cities[index][valueKey];
    const newValue = currentValue + step;

    if (newValue < 0 || newValue > 50) {
      console.warn("مقدار خارج از محدوده مجاز است (۰ تا ۵۰).");
      return;
    }

    axios.post(`${backendUrl}/users/${userId}/change-value/`, { step , valueKey}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        const updatedCities = [...cities];
        updatedCities[index][valueKey] = res.data[valueKey];
        setCities(updatedCities);
      })
      .catch(err => {
        console.error("خطا در تغییر مقدار:", err);
      });
  };
 
}
