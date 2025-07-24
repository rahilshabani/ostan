import React, { useState, useEffect } from 'react';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";

const AddSchoolModal = ({ isOpen, onClose, county, area }) => {
  // alert(county)
const [schools, setSchools] = useState([]);
  useEffect(() => {
  if (isOpen) {
    setFormData({
        name: '',
        code: '',
        area: '',
        county: county,
        phone: '',
        gb: 'girl',
        sch_type: 'dolati',
        branch: 'fani',
    });


  }
}, [isOpen]);

  const [formData, setFormData] = useState({
      name: '',
      code: '',
      area: area,
      county: county,
      phone: '',
      gb: 'girl',
      sch_type: 'dolati',
      branch: 'fani',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  //  const dataToSend = {
  //   ...formData,
  //   county: county
  // };
  try {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

    if (!token) {
      console.error("No access token found!");
      return;
    }
    


    const response = await axios.post(
      `${backendUrl}/users/school/register/`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("ثبت موفق:", response.data);
    onClose(formData);

  } catch (error) {
    console.error("خطا در ثبت‌نام:", error.response?.data || error.message);
  }
};


  if (!isOpen) return null;

return (
  <>
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={onClose}
    ></div>

    <div className="fixed inset-10 md:inset-20 z-50 bg-white rounded-lg shadow-xl overflow-auto">
      <div className="relative p-6 max-w-4xl mx-auto">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 text-3xl font-bold absolute top-4 left-4"
          aria-label="بستن"
        >
          &times;
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-right border-b pb-4">
          ثبت هنرستان جدید
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right"
        >

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">نام هنرستان</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium mb-1">کد هنرستان</label>
            <input
              type="text"
              name="code"
              maxLength="8"
              value={formData.code}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">شماره تماس هنرستان</label>
            <input
              type="text"
              name="phone"
              maxLength="11"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* GB */}
          <div>
            <label className="block text-sm font-medium mb-1">دخترانه یا پسرانه</label>
            <select
              name="gb"
              value={formData.gb}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            >
              <option value="girl">دخترانه</option>
              <option value="boy">پسرانه</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">نوع هنرستان</label>
            <select
              name="sch_type"
              value={formData.sch_type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            >
              <option value="dolati">دولتی</option>
              <option value="gheir">غیرانتفاعی</option>
              <option value="nemoone">نمونه</option>
              <option value="shahed">شاهد</option>
              <option value="omana">هیات امنایی</option>
              <option value="sampad">سمپاد</option>
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium mb-1">شاخه</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            >
              <option value="fani">فنی و حرفه‌ای</option>
              <option value="kar">کاردانش</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-end mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
              ذخیره اطلاعات
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
);

};

export default AddSchoolModal;
