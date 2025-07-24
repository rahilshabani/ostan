import React, { useState, useEffect } from 'react';
import axios from 'axios';
import degrees from '../data/degrees';
axios.defaults.withCredentials = true;


const Profile = ({ id, onDelete }) => {

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";

useEffect(() => {


  axios.get(`${backendUrl}/users/profile/${id}/`)
  .then(response => {
    setUser(response.data);
    setFormData({ ...response.data, password: '' });
  })
  .catch(error => {
    console.error(error.response);
    setError("خطا در دریافت اطلاعات کاربر.");
  });
}, [backendUrl, id]);



const handleResetPassword = async () => {
  if (!formData.code || formData.code === '' || !formData.id) {
    setError("کد پرسنلی یا شناسه کاربر موجود نیست.");
    return;
  }

  try {

  const response = await axios.post(
  `${backendUrl}users/reset-password/`,
  {
    user_id: formData.id,
    code: formData.code,
  },
  {
    headers: {
      // Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }
);

    setSuccess('نام کاربری و رمز عبور با موفقیت تغییر یافت.');
    setError('');
  } catch (error) {
    if (error.response) {
      setError(error.response.data.detail || 'خطا در تغییر رمز عبور.');
    } else {
      setError('خطا در ارتباط با سرور.');
    }
  }
};



const handelDeleteThisCounty = async () => {
  if (!formData.id) {
    setError("شناسه کاربر موجود نیست.");
    return;
  }


  try {
 

  const response = await axios.post(
  `${backendUrl}users/delete/`,
  {
    user_id: formData.id,
  }
);


    onDelete(formData.id);

  } catch (error) {
    if (error.response) {
      setError(error.response.data.detail || 'خطا در حذف شهرستان');
    } else {
      setError('خطا در ارتباط با سرور.');
    }
  }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSave = () => {
    if (!formData.username || !formData.code || !formData.first_name || !formData.last_name|| !formData.county || !formData.area) {
      setError('تمامی فیلدهای ضروری باید پر شوند.');
      return;
    }

    const formDataToSend = new FormData();
    console.log(formData)
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
 

    // const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    console.log("form: ", formDataToSend)
    axios.put(`${backendUrl}/users/profile/${id}/`, formDataToSend, {
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      setUser(response.data);
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
    <>
    { editMode? (
    <button  onClick={handelDeleteThisCounty} className="float-left position-absolute bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">حذف</button>
    ):(
      <></>
    )}
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}
      {success && <div className="text-green-600 text-center mb-4">{success}</div>}

      <div className="mt-6 space-y-4 text-right">
        <InputField label="شهرستان" name="county" value={formData.county} onChange={handleChange} disabled={!editMode} />
        <InputField label="منطقه" name="area" value={formData.area} onChange={handleChange} disabled={!editMode} />
        <InputField label="نام کاربری" name="username" value={formData.username} onChange={handleChange} disabled={!editMode} />
        <InputField label="کد پرسنلی" name="code" type="text" value={formData.code} onChange={handleChange} disabled={!editMode} />
        <InputField label="نام سرگروه" name="first_name" value={formData.first_name} onChange={handleChange} disabled={!editMode} />
        <InputField label="نام خانوادگی سرگروه" name="last_name" value={formData.last_name} onChange={handleChange} disabled={!editMode} />


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

      </div>

      <div className="flex justify-between mt-6">
        {editMode ? (
          <>
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              ذخیره
            </button>
            <button onClick={() => {
              setEditMode(false);
              // setPreviewImage(null);
              // setProfileImage(null);
            }} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              لغو
            </button>
          </>
        ) : (
          <>
          <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            ویرایش
          </button>
           <button
            onClick={handleResetPassword}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            ریست
          </button>
          </>
        )}


     
      </div>
    </>
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
