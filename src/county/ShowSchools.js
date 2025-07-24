import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import mazandaranCounties from '../data/mazandaranCounties';
import SchoolProfile from './SchoolProfile';


const ShowSchools = ({schools, setSchools , county}) => {

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";

  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");



  axios.get(`${backendUrl}/users/school/show/`, {
  params: { county: county },
  headers: {
    Authorization: `Bearer ${token}`
  }
})
    .then(response => {
      console.log('داده‌های برگشتی از سرور:', response.data);
      setSchools(response.data);
    })
    .catch(error => {
      console.error("خطا در دریافت شهرستان ها", error);
    });
}, []);


const handelChangeProfile = (id) => {
  setSchools(prevSchools => prevSchools.filter(school => school.id !== id));
}
  return (
    <div dir="rtl">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
{schools.length > 0 ? (
                schools.map((school) => (
  <div  key={school.id} className="bg-white shadow-md rounded-lg p-4 text-center border border-gray-200 hover:shadow-lg transition">
    <h2 className="text-xl font-semibold text-gray-800">  {school.name}</h2>
  
<SchoolProfile id={school.id} onDelete ={handelChangeProfile} />
  </div>      
      ))
    ) : (
      <p>هنوز هنرستانی ثبت نشده است.</p>
    )}
  </div>
    </div>
  );
};

export default ShowSchools;
