import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('رمز جدید با تکرار آن مطابقت ندارد');
      return;
    }

    try {
      const res = await axios.post(
        '/users/change-password/',
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          withCredentials: true,
        }
      );
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setMessage('رمز عبور با موفقیت تغییر کرد');
        setTimeout(() => {
        logout();
        }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'خطا در تغییر رمز عبور');
    }
  };


  

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
  `/users/logout/`,
  {}, // body
  {
    headers: {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }
)
.then(response => {
  navigate("/login");
})
.catch(error => {
  const msg = error.response?.data?.error || error.message || 'خطای ناشناخته';
  console.error('❌ خطا:', msg);
});



};



  return (
    <form onSubmit={handleChangePassword} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">تغییر رمز عبور</h2>

      <input
        type="password"
        placeholder="رمز فعلی"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="block w-full mb-3 border p-2 rounded"
      />

      <input
        type="password"
        placeholder="رمز جدید"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="block w-full mb-3 border p-2 rounded"
      />

      <input
        type="password"
        placeholder="تکرار رمز جدید"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="block w-full mb-3 border p-2 rounded"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">ثبت</button>

      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
};

export default ChangePasswordForm;
