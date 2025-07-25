import React, { useState, useEffect, useRef } from 'react';

import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Profile from './Profile';
import FileUploadPage from '../programs/FileUploadPage';
import mazandaranCounties from '../data/mazandaranCounties';
import AddSchoolModal from './AddSchoolModal';
import ShowSchools from './ShowSchools';
import Plot from '../manager/plot'
import ReChart from '../manager/rechart';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;


const ProfilePage = () => {
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const LOGO_URL = `${API_BASE_URL.replace("/api", "")}media/base/logo.png`;
  const [activeSection, setActiveSection] = useState('status');
  const [user, setUser] = useState(null);
  // const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fileInputRef = useRef(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";




function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Matches: csrftoken=value
      if (cookie.startsWith(name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const logout = () => {


const csrfToken = getCookie('csrftoken');

axios.post(
  'http://localhost:8000/users/logout/',
  {}, // body، می‌تونه یه شی باشه
  {
    headers: {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json',
    },
    withCredentials: true, // اگه از کوکی استفاده می‌کنی
  }
)
.then(response => {
  console.log('✅ پاسخ سرور:', response.data);
  alert(`پاسخ موفق: ${response.data.message}`);
  navigate("/login");
})
.catch(error => {
  const msg = error.response?.data?.error || error.message || 'خطای ناشناخته';
  console.error('❌ خطا:', msg);
  alert(`خطا: ${msg}`);
});


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
      const res = await axios.patch("/users/change_picture/", formData, {
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
      await axios.post("/users/refresh/");
    } catch (err) {
      console.error("Refresh failed", err.response?.data);
      throw err; // اگر رفرش شکست خورد، خطا پرتاب می‌کنیم
    }
  };

  const getProfile = async () => {
    try {
      const res = await axios.get("/users/profile/");
      console.log("User:", res.data);
      setUser(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await refreshToken(); // تلاش برای رفرش
          const res = await axios.get("/users/profile/"); // دوباره گرفتن پروفایل
          setUser(res.data);
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError.response?.data);
          navigate("/login"); // اگر رفرش هم شکست خورد => هدایت به لاگین
        }
      } else {
        console.error("Unauthorized", err.response?.data);
        navigate("/login"); // سایر خطاها هم => هدایت به لاگین
      }
    }
  };

  getProfile();
}, [navigate]);


  const handelChangeProfile = () => {
    fetchSchools();
  }

  const fetchSchools = () => {
    axios.get(`${backendUrl}/users/school/show/`, {
      withCredentials: true,
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

  const renderSection = () => {
    switch (activeSection) {
      case 'status':
        var x = backendUrl + "/users/status/1"
        if (!user) return <div className="text-center p-4">در حال بارگذاری...</div>;
        var area = "";
        if (user.area && user.area !== "") {
          area = " " + user.area;
        }
        var ct = mazandaranCounties[user.county] + area;
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
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
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
            <Plot valueKey="iranhooshmand1Value" title="سومین جشنواره ایران هوشمند - محور 1" admin="false" />
            <Plot valueKey="iranhooshmand2Value" title="سومین جشنواره ایران هوشمند - محور 2" admin="false" />
            <Plot valueKey="iranhooshmand3Value" title="سومین جشنواره ایران هوشمند - محور 3" admin="false" />
            <Plot valueKey="iranhooshmand4Value" title="سومین جشنواره ایران هوشمند - محور 4" admin="false" />
            <Plot valueKey="iranhooshmand5Value" title="سومین جشنواره ایران هوشمند - محور 5" admin="false" />
            <Plot valueKey="iranhooshmand6Value" title="سومین جشنواره ایران هوشمند - محور 6" admin="false" />
          </div>
        );

      case 'plan':
        return <Plot valueKey="plan" admin="false" title='عملکرد شهرستان ها در طراحی درس' />
      case 'question':
        return <Plot valueKey="question" admin="false" title='عملکرد شهرستان ها در مسابقات سوالات عملکردی' />
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
     <header className="fixed top-0 w-full z-50 bg-gradient-to-l from-blue-800 to-blue-600 bg-opacity-90 backdrop-blur-md px-6 py-4 flex flex-row-reverse justify-between items-center shadow-lg">
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

      {/* Hamburger button (mobile only) */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded bg-blue-500 text-white shadow"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

<aside
  className={`
    fixed top-0 right-0 z-50 w-64 bg-gradient-to-b from-blue-100 to-white shadow-lg
    p-4 space-y-4 text-right transform transition-transform duration-300
    ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
    md:translate-x-0 md:static
    md:shadow-none md:rounded-none md:bg-transparent
    md:p-0
    overflow-y-auto touch-pan-y
    scrollbar-none
    custom-scroll
  `}
>


        {user ? (
          <div className="flex flex-col items-center space-y-2 mb-6">
            <img
              src={user?.profile_image ? `${backendUrl}${user.profile_image}` : `${backendUrl}/media/base/default-avatar.png`}
              alt={user.username}
              className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 cursor-pointer mt-10"
              onClick={handleImageClick}
            />
            <p className="font-bold text-lg text-gray-800">
              {(user?.first_name ?? '') + " " + (user?.last_name ?? '')}
            </p>
            <p className="text-gray-600">{locationText}</p>
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
          className="w-full text-right py-2 px-4 rounded-lg hover:bg-red-50"
          onClick={logout}
        >
          🔓 خروج
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{renderSection()}</main>
    </div>
  );
};

export default ProfilePage;
