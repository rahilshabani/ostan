import React, { useState, useEffect , useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../axiosInstance';
import AddCityModal from './AddCityModal';
import ShowCities from './ShowCities';
import ShowVisits from './ShowVisits';
import Plot from './plot'; 
import ManagerSTATUS from './managerStatus'
import ChangePasswordForm from '../user/ChangePassword';


const ProfilePage = () => {
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const LOGO_URL = `${API_BASE_URL.replace("/api", "")}media/base/logo.png`;
  const [activeSection, setActiveSection] = useState('status');
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };




const logout = () => {
localStorage.removeItem("access_token");
localStorage.removeItem("refresh_token");
sessionStorage.removeItem("access_token");
sessionStorage.removeItem("refresh_token");
navigate("/login");

};


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const formData = new FormData();
    formData.append('profile_image', file);

    try {
      const res = await axios.patch("users/change_picture/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    

      console.log('پروفایل آپدیت شد:', res.data);
      setUser(res.data);
      alert('تصویر با موفقیت آپلود شد');

    } catch (err) {
      console.error('خطا در آپلود تصویر', err.response?.data);
    }
  };

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";

  useEffect(() => {
      const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

  if (!token) {
    navigate("/login");
    return;
  }

  fetchCities();

  axios.get(`users/profile/`)
    .then(response => {
      setUser(response.data);
    })
    .catch(error => {
      console.error("خطا در دریافت اطلاعات کاربر", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    });
  }, []);

  const handelChangeProfile = () => {
    fetchCities();
  }



  const fetchCities = () => {
    axios.get(`users/show/`)
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error("خطا در دریافت شهرستان ها", error);
      });
  };


  const renderSection = () => {
    switch (activeSection) {
      case 'status':
        return (<><ManagerSTATUS/></>);
      case 'cities':
        return (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
              >
                + افزودن شهر
              </button>
            </div>
            <div>
              <ShowCities  cities={cities} setCities={setCities}/>
            </div>
            <AddCityModal isOpen={isModalOpen} onClose={() => {
              setIsModalOpen(false);
              handelChangeProfile();
            }} />
          </>
        );

      case 'visit':
        return (
          <>
            <ShowVisits />
          </>
        );
      case 'ata':
        return (
          <>
            <Plot valueKey="ataValue" title='عملکرد شهرستان ها در کنفرانس آتا' />
          </>
        );
      case 'iranhooshmand':
        return (
          <>
            <Plot valueKey="iranhooshmand1Value" title="سومین جشنواره ایران هوشمند - محور 1"/>
            <Plot valueKey="iranhooshmand2Value" title="سومین جشنواره ایران هوشمند - محور 2" />
            <Plot valueKey="iranhooshmand3Value" title="سومین جشنواره ایران هوشمند - محور 3"/>
            <Plot valueKey="iranhooshmand4Value" title="سومین جشنواره ایران هوشمند - محور 4"/>
            <Plot valueKey="iranhooshmand5Value" title="سومین جشنواره ایران هوشمند - محور 5"/>
            <Plot valueKey="iranhooshmand6Value" title='سومین جشنواره ایران هوشمند - محور 6' />
          </>
        );
      case 'question':
        return (
          <>
            <Plot valueKey="questionValue" title='عملکرد شهرستان ها در مسابقات سوالات عملکردی'/>
          </>
        );
      case 'plan':
        return (
          <>
            <Plot valueKey="planValue" title='عملکرد شهرستان ها در مسابقات طراحی درس'/>
          </>
        );

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
          <a href="#" className="hover:text-yellow-300 transition font-bold">پنل کاربری</a>
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
            <p className="font-bold text-lg text-gray-800">{user.first_name + " " + user.last_name || user.username}</p>
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
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'cities' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
          onClick={() => { setActiveSection('cities'); setSidebarOpen(false); }}
        >
          📝 شهرستان ها
        </button>

        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'visit' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
          onClick={() => { setActiveSection('visit'); setSidebarOpen(false); }}
        >
          📝 بررسی بازدید شهرستان ها
        </button>

        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'ata' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
          onClick={() => { setActiveSection('ata'); setSidebarOpen(false); }}
        >
          🎤 عملکرد در کنفرانس آتا
        </button>

        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'iranhooshmand' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
          onClick={() => { setActiveSection('iranhooshmand'); setSidebarOpen(false); }}
        >
          🤖 عملکرد ایران هوشمند
        </button>

        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'plan' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
          onClick={() => { setActiveSection('plan'); setSidebarOpen(false); }}
        >
          🏆 عملکرد در طراحی درس
        </button>

        <button
          className={`w-full text-right py-2 px-4 rounded-lg ${activeSection === 'question' ? 'bg-blue-200 text-blue-800 font-bold' : 'hover:bg-blue-50'}`}
          onClick={() => { setActiveSection('question'); setSidebarOpen(false); }}
        >
          ❓ عملکرد در طراحی سوال عملکردی
        </button>
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
      <main className="flex-1 p-6 mt-20">
        {renderSection()}
      </main>
    </div>
  );
};

export default ProfilePage;
