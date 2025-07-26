import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';
const SchoolProfile = ({ id , onDelete }) => {
  const [school, setSchool] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    phone: '',
    gb: '',
    sch_type: '',
    branch: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 
  useEffect(() => {

    axios.get(`/users/school/profile/${id}`)
    .then(response => {
      setSchool(response.data);
      setFormData(response.data);
    })
    .catch(error => {
      console.error(error);
      if (error.response?.status === 401) {
        setError("دسترسی غیرمجاز. لطفاً دوباره وارد شوید.");
      } else {
        setError("خطا در بارگذاری اطلاعات.");
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSave = () => {

  axios.put(`/users/school/profile/${id}/`, formData)
  .then(response => {
    setSchool(response.data);
    setFormData(response.data);
    setEditMode(false);
    setSuccess('پروفایل با موفقیت به‌روزرسانی شد.');
    setError('');
  })
  .catch(error => {
  if (error.response) {
    setError(error.response.data.detail || 'خطا در به‌روزرسانی پروفایل.');
  } else {
    setError('خطا در ارتباط با سرور.');
  }
  setSuccess('');
});

};


const handelDeleteThisCounty = async () => {
  if (!formData.id) {
    setError("شناسه کاربر موجود نیست.");
    return;
  }


  try {
    const response = await axios.post(
      `/users/delete-county/`,
      {
        user_id: formData.id,
      }
    );


    onDelete(formData.id);

  } catch (error) {
      if (error.response) {
    setError(error.response.data.detail || 'خطا در به‌روزرسانی پروفایل.');
  } else {
    setError('خطا در ارتباط با سرور.');
  }
  setSuccess('');
  }
};



  if (!school) {
    return <div className="text-center mt-6">در حال بارگذاری...</div>;
  }

  return (
    <>
    { editMode? (
    <button  onClick={handelDeleteThisCounty} className="float-left position-absolute bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">حذف</button>
    ):(
      <></>
    )}
    <div className="max-w-3xl mx-auto text-right bg-white shadow-lg rounded-xl mt-10 p-6">
       
      {/* <h2 className="text-2xl font-bold mb-4 border-b pb-2">پروفایل مدرسه</h2> */}

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="نام مدرسه" name="name" value={formData.name} onChange={handleChange} disabled={!editMode} />
        <InputField label="کد مدرسه" name="code" value={formData.code} onChange={handleChange} disabled />

        <InputField label="شماره تماس" name="phone" value={formData.phone} onChange={handleChange} disabled={!editMode} />

        <div>
          <label className="block text-gray-700">دخترانه یا پسرانه</label>
          <select
            name="gb"
            value={formData.gb || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="girl">دخترانه</option>
            <option value="boy">پسرانه</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">نوع مدرسه</label>
          <select
            name="sch_type"
            value={formData.sch_type || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="dolati">دولتی</option>
            <option value="gheir">غیرانتفاعی</option>
            <option value="nemoone">نمونه</option>
            <option value="shahed">شاهد</option>
            <option value="omana">هیات امنایی</option>
            <option value="sampad">سمپاد</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">شاخه</label>
          <select
            name="branch"
            value={formData.branch || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="fani">فنی و حرفه ای</option>
            <option value="kar">کاردانش</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              ذخیره
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setFormData(school);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              لغو
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            ویرایش
          </button>
        )}
      </div>
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

export default SchoolProfile;
