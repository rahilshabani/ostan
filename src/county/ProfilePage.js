import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from "react-router-dom";
import axios from '../axiosInstance';
import Profile from './Profile';
import FileUploadPage from '../programs/FileUploadPage';
import mazandaranCounties from '../data/mazandaranCounties';
import AddSchoolModal from './AddSchoolModal';
import ShowSchools from './ShowSchools';
import Plot from '../manager/plot'
import ReChart from '../manager/rechart';
import ChangePasswordForm from '../user/ChangePassword';



const ProfilePage = () => {
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const LOGO_URL = API_BASE_URL ? `${API_BASE_URL.replace("/api", "")}media/base/logo.png` : "/media/base/logo.png";
  const [activeSection, setActiveSection] = useState('status');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fileInputRef = useRef(null);




const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("refresh_token");
  navigate("/login");
};



  const handleImageClick = () => {
    fileInputRef.current.click();
  };

 

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const formData = new FormData();
    formData.append('profile_image', file);

    try {
      const res = await axios.patch(`users/change_picture/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('پروفایل آپدیت شد:', res.data);
      setUser(res.data);
    } catch (err) {
      console.error('خطا در آپلود تصویر', err.response?.data);
    }
  };


 useEffect(() => {
      const refreshToken = async () => {
      try {
        const refresh = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
        if (!refresh) throw new Error("Refresh token not found");

        const res = await axios.post(`/users/refresh/`, { refresh });

        const { access, refresh: newRefresh } = res.data;

        if (access) {
          localStorage.setItem("access_token", access);
          sessionStorage.setItem("access_token", access);
        }

        if (newRefresh) {
          localStorage.setItem("refresh_token", newRefresh);
          sessionStorage.setItem("refresh_token", newRefresh);
        }

      } catch (err) {
        console.error("Refresh failed", err.response?.data);
        throw err;
      }
    };

  const getProfile = async () => {
    try {
      const res = await axios.get(`/users/profile/`);
      console.log("User:", res.data);
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401) {

        try {
  await refreshToken();
  const res = await axios.get(`/users/profile/`);
  setUser(res.data);
} catch (refreshError) {
  console.error("خطا در تمدید توکن", refreshError);
  navigate("/login");
}

      } else {
        console.error("Unauthorized", err.response?.data);
        navigate("/login"); 
      }
    }
  };

  getProfile();
}, [navigate]);


  const handelChangeProfile = () => {
  if (user) fetchSchools();
};


 const fetchSchools = () => {
  if (!user?.county) return;
  axios.get(`users/school/show/`, {
    params: { county: user.county },
  })
  .then(response => {
    console.log('داده‌های برگشتی از سرور:', response.data);
    setSchools(response.data);
  })
  .catch(error => {
    console.error("خطا در دریافت هنرستان ها", error);
  });
};


  if (!user) {
  return <div className="w-full h-screen flex justify-center items-center text-lg">در حال بارگذاری اطلاعات کاربر...</div>;
}


  const renderSection = () => {
    switch (activeSection) {
      case 'status':
        var x = API_BASE_URL + "/users/status/1"
        if (!user) return <div className="text-center p-4">در حال بارگذاری...</div>;
        var area = "";
        if (user.area && user.area !== "") {
          area = " " + user.area;
        }
        const ct = mazandaranCounties[user.county] + area;
        return (
          <div className="pt-20">
            <ReChart title={`نمودار وضعیت شهرستان ${mazandaranCounties[user.county]} از منظر تعداد بازدید`} apiUrl={x} county={ct} />
          </div>
        );
      case 'profile':
        return <Profile />;
      case 'schools':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="button text-white px-4 py-2 rounded-lg shadow"
              >
                + افزودن هنرستان
              </button>
            </div>
            <div>
              <ShowSchools schools={schools} setSchools={setSchools} county={user.county} />
            </div>

            <AddSchoolModal county={user.county} area={user.area} isOpen={isModalOpen} onClose={() => {
              setIsModalOpen(false);
              handelChangeProfile();
            }} />
          </>
        );

      case 'visits':
        return <FileUploadPage user={user} />;
      case 'ata':
        return <Plot valueKey="ataValue" admin="false" title='عملکرد شهرستان ها در کنفرانس آتا' />
      case 'iranhooshmand':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {['1','2','3','4','5','6'].map(axis => (
              <Plot 
                key={axis} 
                valueKey={`iranhooshmand${axis}Value`} 
                title={`سومین جشنواره ایران هوشمند - محور ${axis}`} 
                admin="false" 
              />
            ))}

          </div>
        );

      case 'plan':
        return <Plot valueKey="plan" admin="false" title='عملکرد شهرستان ها در طراحی درس' />
      case 'question':
        return <Plot valueKey="question" admin="false" title='عملکرد شهرستان ها در مسابقات سوالات عملکردی' />
          case 'chpass':
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <ChangePasswordForm />
        </div>
      );
      default:
        return null;
    }
  };

  let locationText = "";
  if (user) {
    if (!user.area || user.area === '' || user.area === mazandaranCounties[user.county]) {
      locationText = mazandaranCounties[user.county];
    } else {
      locationText = `${mazandaranCounties[user.county]} (${user.area})`;
    }
  }

  return (
    <div className="min-h-screen flex font-sans bg-gradient-to-br from-blue-50 to-white" dir="rtl">
     <header className="fixed top-0 w-full z-50 bg-opacity-90 backdrop-blur-md px-6 py-4 flex flex-row-reverse justify-between items-center shadow-lg menu-gradient">
        <div className="flex items-center flex-row-reverse space-x-3">
          <img
            src={LOGO_URL}
            alt="لوگو"
            className="w-10 h-10 rounded-full"
          /><a href='/'>
          <h1 className="text-xl font-bold text-white">گروه کامپیوتر استان مازندران</h1>
          </a>
        </div>
        <nav className="hidden md:flex space-x-6 space-x-reverse text-white">
          <a href="/" className="hover:text-yellow-300 transition">خانه</a>
          <a href="/login/" className="hover:text-yellow-300 transition font-bold">پنل کاربری</a>
          <a href="#" className="hover:text-yellow-300 transition">درباره ما</a>
        </nav>
      </header>


      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

   
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded bg-blue-500 text-white shadow"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

<aside
  className={`
    fixed top-0 right-0 z-50 w-64
    p-4 space-y-4 text-right
    transform transition-transform duration-300
    ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
    md:translate-x-0 md:static
    md:shadow-none md:rounded-none md:bg-transparent md:p-0
    overflow-y-auto touch-pan-y
    scrollbar-none custom-scroll
    sidebar-gradient backdrop-blur-md shadow-lg rounded-l-xl
  `}
>


        {user ? (
          <div className="flex flex-col items-center space-y-2 mb-6">
            <img
              src={user?.profile_image ? `${API_BASE_URL}${user.profile_image}` : `${API_BASE_URL}/media/base/default-avatar.png`}
              alt={user.username}
              className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 cursor-pointer mt-10"
              onClick={handleImageClick}
            />
            <p className="font-bold text-lg">
              {(user?.first_name ?? '') + " " + (user?.last_name ?? '')}
            </p>
            <p className="text-gray-400">{locationText}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-6">در حال بارگذاری...</p>
        )}

        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'status' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
          onClick={() => { setActiveSection('status'); setSidebarOpen(false); }}
        >
          📊 وضعیت کلی
        </button>

        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'profile' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
          onClick={() => { setActiveSection('profile'); setSidebarOpen(false); }}
        >
          👤 پروفایل کاربر
        </button>

        {user && (
          <button
            className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'schools' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
            onClick={() => { setActiveSection('schools'); setSidebarOpen(false); }}
          >
            🏫 هنرستان های {mazandaranCounties[user.county]}
          </button>
        )}

        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'visits' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
          onClick={() => { setActiveSection('visits'); setSidebarOpen(false); }}
        >
          📝 بازدیدها
        </button>

        {user && (
          <>
            <button
              className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'ata' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
              onClick={() => { setActiveSection('ata'); setSidebarOpen(false); }}
            >
              🎤 {mazandaranCounties[user.county]} در کنفرانس آتا
            </button>

            <button
              className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'iranhooshmand' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
              onClick={() => { setActiveSection('iranhooshmand'); setSidebarOpen(false); }}
            >
              🤖 {mazandaranCounties[user.county]} در ایران هوشمند
            </button>

            <button
              className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'plan' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
              onClick={() => { setActiveSection('plan'); setSidebarOpen(false); }}
            >
              🏆 {mazandaranCounties[user.county]} در مسابقات طرح درس
            </button>

            <button
              className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'question' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
              onClick={() => { setActiveSection('question'); setSidebarOpen(false); }}
            >
              ❓ {mazandaranCounties[user.county]} در سوالات عملکردی
            </button>
          </>
        )}
        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'chpass' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
          onClick={() => { setActiveSection('chpass'); setSidebarOpen(false); }}
        >
          🔒 تغییر رمز عبور
        </button>

        <button
          className="w-full text-right py-2 px-4 rounded-lg hover:bg-red-50"
          onClick={logout}
        >
          🔓 خروج
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 mt-20">{renderSection()}</main>
    </div>
  );
};

export default ProfilePage;
