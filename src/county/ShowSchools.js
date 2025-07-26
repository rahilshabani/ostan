import React, { useEffect } from 'react';
import axios from '../axiosInstance';
import SchoolProfile from './SchoolProfile';

const ShowSchools = ({ schools, setSchools, county }) => {

  useEffect(() => {
    if (!county) return;  // اگر county خالی بود درخواست نزنه

    axios.get(`/users/school/show/`, { params: { county } })
      .then(response => {
        setSchools(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => {
        console.error("خطا در دریافت شهرستان ها", error);
        if (error.response?.status === 401) {
          window.location.href = "/login";  // هدایت به لاگین در صورت 401
        }
      });
  }, [county, setSchools]);

  const handleRemoveSchool = (id) => {
    setSchools(prevSchools => prevSchools.filter(school => school.id !== id));
  };

  return (
    <div dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {schools.length > 0 ? (
          schools.map((school) => (
            <div key={school.id} className="bg-white shadow-md rounded-lg p-4 text-center border border-gray-200 hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-gray-800">{school.name}</h2>
              <SchoolProfile id={school.id} onDelete={handleRemoveSchool} />
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
