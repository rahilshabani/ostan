import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import mazandaranCounties from '../data/mazandaranCounties';


const COLORS = ['#00C49F', '#FF8042'];

function parseJalaliDate(jalaliStr) {
  if (!jalaliStr) return 0;
  const parts = jalaliStr.split('-').map(Number);
  return parts[0] * 10000 + parts[1] * 100 + parts[2];
}

function parseGregorianDate(dateStr, timeStr) {
  if (!dateStr || !timeStr) return new Date(0);
  const isoStr = `${dateStr}T${timeStr.replace(/-/g, ':')}`;
  return new Date(isoStr);
}

const ToggleSwitch = ({ enabled, onToggle, label }) => {
  return (
    <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer select-none">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        onClick={() => onToggle(!enabled)}
        role="switch"
        aria-checked={enabled}
        tabIndex={0}
        className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
          enabled ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${
            enabled ? '-translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

const VisitList = ({ user, refreshKey }) => {
  const [visits, setVisits] = useState([]);
  const [sortByVisitTime, setSortByVisitTime] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/programs/visits/`);
        const filtered = res.data.filter((v) => v.county === user.county);

        const sorted = filtered
          .map((group) => {
            const sortedVisits = [...group.visits].sort((a, b) => {
              const aParts = a.file_name.split('_');
              const bParts = b.file_name.split('_');

              if (sortByVisitTime) {
                return parseJalaliDate(bParts[3]) - parseJalaliDate(aParts[3]);
              } else {
                return (
                  parseGregorianDate(bParts[1], bParts[2]) -
                  parseGregorianDate(aParts[1], aParts[2])
                );
              }
            });

            return {
              ...group,
              visits: sortedVisits,
            };
          })
          .sort((a, b) => {
            if (a.visits.length === 0) return 1;
            if (b.visits.length === 0) return -1;

            const aParts = a.visits[0].file_name.split('_');
            const bParts = b.visits[0].file_name.split('_');

            if (sortByVisitTime) {
              return parseJalaliDate(bParts[3]) - parseJalaliDate(aParts[3]);
            } else {
              return (
                parseGregorianDate(bParts[1], bParts[2]) -
                parseGregorianDate(aParts[1], aParts[2])
              );
            }
          });

        setVisits(sorted);
      } catch (err) {
        console.error('خطا در دریافت بازدیدها:', err);
      }
    };

    fetchData();
  }, [user, refreshKey, sortByVisitTime]);

  const handleDownload = (fileUrl) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL.replace(/\/$/, '');
    const downloadUrl = fileUrl.startsWith('http') ? fileUrl : `${backendUrl}${fileUrl}`;
    window.open(downloadUrl, '_blank');
  };

  const handleDelete = async (fileUrl) => {
    const confirmed = window.confirm('آیا از حذف این بازدید مطمئن هستید؟');
    if (!confirmed) return;

    try {
      await axios.delete(`/programs/delete_visit/`, {
        data: { file_url: fileUrl },
      });

      setVisits((prev) =>
        prev
          .map((group) => ({
            ...group,
            visits: group.visits.filter((file) => file.file_url !== fileUrl),
          }))
          .filter((group) => group.visits.length > 0)
      );
    } catch (err) {
      console.error('خطا در حذف فایل:', err);
      alert('خطا در حذف فایل');
    }
  };
const label = sortByVisitTime ? 'براساس بازدید' : 'براساس ایجاد';
  return (
    <div dir="rtl" className="w-full px-4 mt-10">
      <div className="mb-4 text-sm">
        <ToggleSwitch
          enabled={sortByVisitTime}
          onToggle={setSortByVisitTime}
          label={label}
        />

      </div>

      <h2 className="text-xl font-bold text-center mb-6">
        بازدیدهای ثبت‌شده برای شهرستان{' '}
        {(!user.area || user.area === user.county)
          ? mazandaranCounties[user.county]
          : `${mazandaranCounties[user.county]} (${user.area})`}
      </h2>

      {visits.length === 0 ? (
        <p className="text-center text-gray-500">بازدیدی ثبت نشده است.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {visits.map((item, i) =>
            item.visits.map((file, idx) => {
              const chartData = [
                { name: 'موفق', value: file.success_percent },
                { name: 'ناموفق', value: 100 - file.success_percent },
              ];

              const parts = file.file_name.split('_');
              const jalaliDate = parts.length > 3 ? parts[3] : '';

              return (
                <div
                  key={`${i}-${idx}`}
                  className="relative w-[140px] h-[180px] bg-white border rounded-xl shadow-sm hover:shadow-md transition hover:scale-105 p-2"
                >
                  <button
                    onClick={() => handleDelete(file.file_url)}
                    title="حذف بازدید"
                    className="absolute top-1 left-1 text-red-500 text-lg font-bold z-10 hover:text-red-700"
                  >
                    ×
                  </button>

                  <div
                    onClick={() => handleDownload(file.file_url)}
                    title="برای دانلود کلیک کنید"
                    className="cursor-pointer"
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

                    <div className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-gray-700 text-center px-2 leading-tight">
                      {file.school_name}
                    </div>
                  </div>

                  <div className="mt-1 text-center text-xs text-gray-500">
                    {jalaliDate.replace(/-/g, ':')}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default VisitList;
