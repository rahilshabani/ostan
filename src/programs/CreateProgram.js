import React, { useState } from 'react';
import axios from 'axios';
import Calendar from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';



const CreateProgram = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://rahilshabani.pythonanywhere.com/';

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    participation_type: 'single',
    audience_type: 'both',
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateStr = selectedDay
        ? `${selectedDay.year}-${selectedDay.month.toString().padStart(2, '0')}-${selectedDay.day.toString().padStart(2, '0')}`
        : '';

    await axios.post(`${backendUrl}programs/create/`, {
  ...formData,
  submission_deadline: dateStr,
});

      setMessage('✅ برنامه با موفقیت ثبت شد!');
      setFormData({
        name: '',
        description: '',
        participation_type: 'single',
        audience_type: 'both',
      });
      setSelectedDay(null);
    } catch (error) {
      setMessage('❌ خطا در ثبت برنامه.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">🎯 فرم ثبت برنامه جدید</h2>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-center font-medium ${
            message.includes('موفق') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          type="text"
          placeholder="نام برنامه"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <textarea
          name="description"
          placeholder="توضیحات برنامه"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">نوع شرکت‌کننده</label>
            <select
              name="participation_type"
              value={formData.participation_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="single">انفرادی</option>
              <option value="double">دو نفره</option>
              <option value="group">گروهی</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">نوع مخاطب</label>
            <select
              name="audience_type"
              value={formData.audience_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="student">ویژه هنرجویان</option>
              <option value="teacher">ویژه هنرآموزان</option>
              <option value="both">ترکیبی</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <label className="block mb-3 text-sm font-semibold text-gray-700">📅 مهلت ارسال</label>
          <div className="bg-gray-50 border border-gray-300 rounded-xl p-2">
            <Calendar
              value={selectedDay}
              onChange={setSelectedDay}
              shouldHighlightWeekends
              locale="fa"
              colorPrimary="#0f62fe"
              calendarClassName="responsive-calendar"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
        >
          📌 ثبت برنامه
        </button>
      </form>
    </div>
  );
};

export default CreateProgram;
