import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import mazandaranCounties from '../data/mazandaranCounties';


const AddCityModal = ({ isOpen, onClose }) => {

useEffect(() => {
  if (isOpen) {
    setFormData({
      county: '',
      first_name: '',
      last_name: '',
      code: '',
      area: '',
    });
  }
}, [isOpen]);


  const [formData, setFormData] = useState({
    county: '',
    first_name: '',
    last_name: '',
    code: '',
    area: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    
    e.preventDefault();
   try {
  const response = await axios.post(`/manager/register/`, formData);
  onClose();
  alert("شهر با موفقیت ثبت شد.");
} catch (error) {
  console.error("خطا در ثبت‌نام:", error.response?.data);
  alert("اشتباهی رخ داده است");
}

  };

  if (!isOpen) return null;

  return (
    <>
     <div
  className="fixed inset-0 bg-black bg-opacity-50 z-40"
  onClick={(e) => {
    if (e.target === e.currentTarget) onClose();
  }}
/>

      <div className="fixed inset-20 z-50 bg-white overflow-auto">
        <div className="p-6 max-w-4xl mx-auto relative">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl font-bold absolute top-4 left-4"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-6 text-right">افزودن شهر جدید</h2>

        
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">

          
            <div>
              <label className="block text-sm font-medium mb-1">شهرستان</label>
          <select
        name="county"
        value={formData.county}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 block text-sm"
      >
        <option value="">-- انتخاب کنید --</option>
        {Object.entries(mazandaranCounties).map(([slug, name]) => (
          <option key={slug} value={slug}>
            {name}
          </option>
        ))}
      </select>
      </div>

       <div>
              <label className="block text-sm font-medium mb-1">منطقه</label>
              <input
                type="text"
                name="area"
                maxLength="64"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right lg:col-span-2">
            <div>
              <label className="block text-sm font-medium mb-1">نام سرگروه</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">نام خانوادگی سرگروه</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

                 <div>
              <label className="block text-sm font-medium mb-1">کد پرسنلی سرگروه</label>
              <input
                type="text"
                name="code"
                maxLength="8"
                value={formData.code}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            </div>
            <div className="col-span-2 flex justify-between mt-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                اعمال
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCityModal;
