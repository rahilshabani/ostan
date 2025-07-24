import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import mazandaranCounties from '../data/mazandaranCounties';

axios.defaults.withCredentials = true;

const COLORS = ['#00C49F', '#FF8042']; // رنگ‌ها: موفق / ناموفق

const ShowVisits = () => {
  const [cities, setCities] = useState([]);
  const [visits, setVisits] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://rahilshabani.pythonanywhere.com/';

  useEffect(() => {
    axios.get(`${backendUrl}/programs/visits/`)
      .then(res => setVisits(res.data))
      .catch(err => console.error('خطا در دریافت بازدیدها:', err));

    axios.get(`${backendUrl}/users/show/`)
      .then(res => setCities(res.data))
      .catch(err => console.error('خطا در دریافت شهرستان‌ها:', err));
  }, []);

  const handleDownload = (fileUrl) => {
    const downloadUrl = fileUrl.startsWith('http') ? fileUrl : `${backendUrl}${fileUrl}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div dir="rtl" className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {cities.length > 0 ? (
          cities.map((city) => {
            const cityVisits = visits.filter(v => v.county === city.county);

            return (
              <div
                key={city.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-5 text-center"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {mazandaranCounties[city.county] || city.county}
                  {
                    city.area && city.area !== city.county && (
                      <> ({city.area})</>
                    )
                  }
                </h2>



                {cityVisits.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center">
                    {cityVisits.map((visit) =>
                      visit.visits.map((file, i) => {
                        const chartData = [
                          { name: 'موفق', value: file.success_percent },
                          { name: 'ناموفق', value: 100 - file.success_percent },
                        ];

                        return (
                          <div
                            key={i}
                            onClick={() => handleDownload(file.file_url)}
                            title="برای دانلود کلیک کنید"
                            className="relative w-[140px] h-[140px] cursor-pointer transition hover:scale-105"
                          >
                            <PieChart width={140} height={140}>
                              <Pie
                                data={chartData}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius={46}
                                outerRadius={60}
                                stroke="#f0f0f0"
                                strokeWidth={2}
                                labelLine={false}
                              >
                                {chartData.map((entry, idx) => (
                                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>

                            {/* متن وسط نمودار */}
                            <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-gray-700 text-center px-2 leading-tight break-words">
                              {file.school_name}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">هیچ بازدیدی برای این شهرستان ثبت نشده است.</p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600 mt-8">هیچ شهرستانی ثبت نشده است.</p>
        )}
      </div>
    </div>
  );
};

export default ShowVisits;
