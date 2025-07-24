import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './Profile';
import FileUploadPage from './programs/FileUploadPage';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [user, setUser] = useState(null);
  const [programs, setPrograms] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";

  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

    // دریافت اطلاعات کاربر
    axios.get(`${backendUrl}/users/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("خطا در دریافت اطلاعات کاربر", error);
      });

    // دریافت برنامه‌ها
    axios.get(`${backendUrl}/programs/view/`)
      .then(response => {
        setPrograms(response.data);
      })
      .catch(error => {
        console.error("خطا در دریافت برنامه‌ها", error);
      });
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'classes':
        return (
          <div className="p-8 text-gray-800 text-right">
            <h2 className="text-2xl font-bold mb-4">📌 لیست برنامه‌ها</h2>
            <ul className="list-disc pr-6 space-y-3">
              {programs.length > 0 ? (
                programs.map((program, index) => (
                  <li key={index} className="border p-3 rounded shadow-sm bg-white">
                    <p className="font-bold">نام برنامه: {program.name}</p>
                    <p>نوع شرکت‌کننده: {program.participation_type === 'single' ? 'انفرادی' : program.participation_type === 'double' ? 'دو نفره' : 'گروهی'}</p>
                    <p>گروه مخاطب: {
                      program.audience_type === 'student' ? 'ویژه هنرجویان' :
                        program.audience_type === 'teacher' ? 'ویژه هنرآموزان' : 'ترکیبی'
                    }</p>
                    <p>مهلت ارسال: {program.submission_deadline}</p>
                    {program.description && <p className="text-gray-600 text-sm mt-1">توضیحات: {program.description}</p>}
                  </li>
                ))
              ) : (
                <li>برنامه‌ای موجود نیست.</li>
              )}
            </ul>
          </div>
        );
      case 'about':
        return <FileUploadPage audience="teacher" />;
      case 'conf':
        return <FileUploadPage audience="student" />;
      case 'question':
        return <FileUploadPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-4 hidden md:block text-right">
        {user ? (
          <div className="flex flex-col items-center space-y-2 mb-6">
            <img
              src={user.profile_image ? `${backendUrl}${user.profile_image}` : "/default-avatar.png"}
              alt="User Avatar"
              className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
            />
            <p className="font-bold text-lg text-gray-800">{user.full_name || user.username}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-6">در حال بارگذاری...</p>
        )}

        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'profile' ? 'bg-red-100 text-red-600 font-bold' : 'hover:bg-gray-100'}`}
          onClick={() => setActiveSection('profile')}
        >
          👤 پروفایل کاربر
        </button>
        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'classes' ? 'bg-red-100 text-red-600 font-bold' : 'hover:bg-gray-100'}`}
          onClick={() => setActiveSection('classes')}
        >
          📚 بازدیدها
        </button>
        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'about' ? 'bg-red-100 text-red-600 font-bold' : 'hover:bg-gray-100'}`}
          onClick={() => setActiveSection('about')}
        >
          ℹ️ کنفرانس ها
        </button>
        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'conf' ? 'bg-red-100 text-red-600 font-bold' : 'hover:bg-gray-100'}`}
          onClick={() => setActiveSection('conf')}
        >
          ℹ️ سوالات عملکردی
        </button>
        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'question' ? 'bg-red-100 text-red-600 font-bold' : 'hover:bg-gray-100'}`}
          onClick={() => setActiveSection('question')}
        >
          ℹ️ طرح درس
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{renderSection()}</main>
    </div>
  );
};

export default ProfilePage;
