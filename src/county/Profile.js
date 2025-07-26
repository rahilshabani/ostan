import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
import mazandaranCounties from '../data/mazandaranCounties';
import degrees from '../data/degrees';



const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 // گرفتن اطلاعات کاربر
useEffect(() => {
  axios.get(`/users/profile/`)
    .then(response => {
      setUser(response.data);
      setFormData(response.data);
      console.log("first data:", response.data);
    })
    .catch(error => {
      console.error(error.response);
      if (error.response && error.response.status === 401) {
        setError("دسترسی غیرمجاز. لطفاً دوباره وارد شوید.");
      }
    });
}, []);

useEffect(() => {
  if (success) {
    const timer = setTimeout(() => setSuccess(''), 4000);
    return () => clearTimeout(timer);
  }
}, [success]);

useEffect(() => {
  if (error) {
    const timer = setTimeout(() => setError(''), 4000);
    return () => clearTimeout(timer);
  }
}, [error]);





  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSave = () => {
    if (!formData.username || !formData.first_name || !formData.last_name) {
      setError('تمامی فیلدهای ضروری باید پر شوند.');
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
 

    axios.put(`/users/profile/`, formDataToSend)
    .then(response => {
      setUser(response.data);
      console.log("user profile:", response.data)
      setFormData(response.data);
      setEditMode(false);
      setSuccess('پروفایل با موفقیت به‌روزرسانی شد.');
      setError('');
    })
    .catch(error => {
      console.error(error.response);
      setError('خطا در به‌روزرسانی پروفایل. لطفا دوباره تلاش کنید.');
      setSuccess('');
    });
  };

  if (!user) {
    return <p className="text-center text-gray-600 mt-10">در حال بارگذاری...</p>;
  }



  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">پروفایل کاربری</h2>

      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {success && <div className="text-green-600 text-center mb-4">{success}</div>}

 <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <div>
          <label className="block text-gray-700">استان محل خدمت</label>
          <select
  name="province"
  value="mazandaran"
  disabled={true}
  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
>
  <option value="mazandaran">مازندران</option>
</select>
        </div>
    
        <div>
  <label className="block text-gray-700">آموزش و پرورش محل خدمت شما:</label>
   <select
        name="county"
        value={formData.county || ""}
        disabled={true}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {Object.entries(mazandaranCounties).map(([slug, name]) => (
          <option key={slug} value={slug}>
            {name}
          </option>
        ))}
      </select>
</div>
</div>
        
      <div className="mt-6 space-y-4">
         <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <InputField label="کد پرسنلی" name="code" value={formData.code} onChange={handleChange} disabled="true" />
        <InputField label="نام کاربری" name="username" value={formData.username} onChange={handleChange} disabled={!editMode} />
        <InputField label="ایمیل" name="email" type="email" value={formData.email} onChange={handleChange} disabled={!editMode} />
        </div>
         <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <InputField label="نام سرگروه" name="first_name" value={formData.first_name} onChange={handleChange} disabled={!editMode} />
        <InputField label="نام خانوادگی سرگروه" name="last_name" value={formData.last_name} onChange={handleChange} disabled={!editMode} />
        <InputField label="شماره تماس سرگروه" name="phone" type='tel' value={formData.phone} onChange={handleChange} disabled={!editMode} />
        </div>
   
  <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div>
          <label className="block text-gray-700">مدرک تحصیلی سرگروه</label>
             <select
        name="degree"
        value={formData.degree || ""}
        disabled={!editMode}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {Object.entries(degrees).map(([slug, name]) => (
          <option key={slug} value={slug}>
            {name}
          </option>
        ))}
      </select>
        </div>
        <InputField type='number' label="تعداد هنرستان " name="sch_count" value={formData.sch_count} onChange={handleChange} disabled={!editMode} />
        <InputField label="تعداد هنرستان با رشته کامپیوتر" name="cs_sch_count" value={formData.cs_sch_count} onChange={handleChange} disabled={!editMode} />

        </div>
      </div>

      <div className="flex justify-between mt-6">
        {editMode ? (
          <>
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              ذخیره
            </button>
            <button onClick={() => {
              setEditMode(false);
            }} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              لغو
            </button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            ویرایش
          </button>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, disabled, type = "text" }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default Profile;
