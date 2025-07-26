import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import Profile from './Profile';
import mazandaranCounties from '../data/mazandaranCounties';


const ShowCities = ({cities, setCities}) => {

  useEffect(() => {

  axios.get(`/users/show/`)
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
    <div key={city.id} className="bg-white shadow-md rounded-lg p-4 text-center border border-gray-200 hover:shadow-lg transition">
        <Profile id={city.id} onDelete ={handelChangeProfile} />
    </div>
  ))
) : (
  <div className="col-span-full text-center text-gray-500">برنامه‌ای موجود نیست.</div>
)}


  </div>
    </div>
  );
};

export default ShowCities;
