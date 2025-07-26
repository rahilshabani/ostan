import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import Profile from './Profile';
import mazandaranCounties from '../data/mazandaranCounties';

const ShowCities = ({ cities, setCities }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOpenModal = (city) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCity(null);
    setIsModalOpen(false);
  };

  const handleDeleteCity = (id) => {
    setCities(prevCities => prevCities.filter(city => city.id !== id));
    handleCloseModal();
  };

  return (
    <div dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {cities.length > 0 ? (
          cities.map((city) => (
            <div
              key={city.id}
              className="bg-white shadow-md rounded-lg p-6 text-center cursor-pointer border border-gray-300 hover:shadow-xl transition"
              onClick={() => handleOpenModal(city)}
            >
              <h2 className="text-lg font-bold text-gray-700">
                {mazandaranCounties[city.county]}
              </h2>
              <h4 className="text-sm font-bold text-gray-400">
                  برای دیدن جزئیات و ویرایش کلیک کنید
              </h4>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            برنامه‌ای موجود نیست.
          </div>
        )}
      </div>

      {/* Modal */}
        {isModalOpen && selectedCity && (
  <div
    className="fixed inset-0 z-50 bg-black md:max-h-screen bg-opacity-40 overflow-y-auto"
    onClick={handleCloseModal}
  >
    <div className="flex justify-center px-4 py-10 min-h-screen">
      <div
        className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
          پروفایل {mazandaranCounties[selectedCity.county]}
        </h3>
        <div className="max-h-[60vh] overflow-y-auto">
          <Profile id={selectedCity.id} onDelete={handleDeleteCity} />
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default ShowCities;
