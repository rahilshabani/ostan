import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Profile';
import mazandaranCounties from '../data/mazandaranCounties';
axios.defaults.withCredentials = true;


const ShowCities = ({cities, setCities}) => {

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";

  useEffect(() => {
    // const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");



  axios.get(`${backendUrl}/users/show/`, {
  // headers: {
  //   Authorization: `Bearer ${token}`
  // }
    })
    .then(response => {
      console.log('داده‌های برگشتی از سرور:', response.data);
      setCities(response.data);
    })
    .catch(error => {
      console.error("خطا در دریافت شهرستان ها", error);
    });
}, []);


const handelChangeProfile = (id) => {
  setCities(prevCities => prevCities.filter(city => city.id !== id));
}
  return (
    <div dir="rtl">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
{cities.length > 0 ? (
                cities.map((city) => (
  <div  key={city.id} className="bg-white shadow-md rounded-lg p-4 text-center border border-gray-200 hover:shadow-lg transition">
    <h2 className="text-xl font-semibold text-gray-800">  {mazandaranCounties[city.county] || city.county}</h2>
  
<Profile id={city.id} onDelete ={handelChangeProfile} />
  </div>      
      ))
    ) : (
      <li>برنامه‌ای موجود نیست.</li>
    )}
  </div>
    </div>
  );
};

export default ShowCities;
