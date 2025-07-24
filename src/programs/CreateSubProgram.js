import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateSubProgram = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://rahilshabani.pythonanywhere.com/';

  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    program_id: '',
    title: '',
    content: '',
  });
  const [message, setMessage] = useState('');

 
 useEffect(() => {
  axios.get(`${backendUrl}programs/view/`)
    .then((response) => {
      setPrograms(response.data);
    })
    .catch((error) => {
      console.error("خطا در دریافت لیست برنامه‌ها:", error);
    });
}, []);


  // تغییر در فرم
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ثبت زیر برنامه
  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  await axios.post(`${backendUrl}programs/create_sub/`, formData);
  setMessage('✅ زیربرنامه با موفقیت ثبت شد!');
  setFormData({ program_id: '', title: '', content: '' });
} catch (error) {
  console.error(error);
  setMessage('❌ خطا در ثبت زیربرنامه.');
}
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-extrabold text-center text-purple-700 mb-6">🧩 فرم ثبت زیربرنامه</h2>

      {message && (
        <div className={`mb-6 px-4 py-3 rounded-lg text-center font-medium ${message.includes('موفق') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* انتخاب برنامه اصلی */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">انتخاب برنامه اصلی</label>
          <select
            name="program_id"
            value={formData.program_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option value="">-- انتخاب کنید --</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
        </div>

        {/* عنوان زیربرنامه */}
        <input
          name="title"
          type="text"
          placeholder="عنوان زیربرنامه"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />

        {/* توضیحات */}
        <textarea
          name="content"
          placeholder="توضیحات زیربرنامه"
          value={formData.content}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-purple-400 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
        >
          ➕ ثبت زیربرنامه
        </button>
      </form>
    </div>
  );
};

export default CreateSubProgram;
