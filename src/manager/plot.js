import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import mazandaranCounties from '../data/mazandaranCounties';

export default function CityChart({ valueKey = "ataValue", title= "",  admin = "true"  }) {
  const [cities, setCities] = useState([]);


  useEffect(() => {
    axios.get(`/users/show/`)
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error("خطا در دریافت شهرستان‌ها", error);
      });
  }, []);

const changeValue = (userId, step) => {
  if (![1, -1].includes(step)) return;
  const index = cities.findIndex(city => city.id === userId);
  if (index === -1) return;

  const currentValue = cities[index][valueKey];
  const newValue = currentValue + step;

  if (newValue < 0 || newValue > 50) {
    console.warn("مقدار خارج از محدوده مجاز است (۰ تا ۵۰).");
    return;
  }

  axios.post(`/users/${userId}/change-value/`, { step, valueKey })
    .then(res => {
      const updatedCities = [...cities];
      updatedCities[index][valueKey] = res.data[valueKey];
      setCities(updatedCities);
    })
    .catch(err => {
      console.error("خطا در تغییر مقدار:", err);
    });
};

 return (
  <div className="flex flex-col min-h-screen p-6">
    <h1 className="text-center text-xl font-semibold text-gray-800 mb-6">{title}</h1>

    <div className="flex flex-col gap-4 bg-white rounded shadow p-6 w-full max-w-4xl mx-auto md:max-h-full md:overflow-y-auto custom-scrollbar">
  {[...cities]
  .sort((a, b) => b[valueKey] - a[valueKey])
  .map((city) => (
    <div key={city.id} className="flex items-center justify-end gap-4 w-full">
      {admin === "true" && (
        <div className="flex flex-col gap-1">
          <button
            onClick={() => changeValue(city.id, 1)}
            aria-label="افزایش مقدار"
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            +
          </button>
          <button
            onClick={() => changeValue(city.id, -1)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            -
          </button>
        </div>
      )}

      <div className="text-sm font-medium w-24 text-right">
        {mazandaranCounties[city.county]}
      </div>

      <div className="flex-1 bg-gray-200 rounded h-8 relative overflow-hidden">
        {(city[valueKey] || 0) > 0 && (
          <div
            className="button h-full transition-all duration-300 flex items-center justify-end pr-2 text-white font-semibold text-xs"
            style={{
              width: `${city[valueKey] * 2}%`
            }}
          >
            {city[valueKey]}
          </div>
        )}
      </div>
    </div>
  ))}

    </div>
  </div>
);

}
