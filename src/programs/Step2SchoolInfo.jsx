import React, { useState, useEffect } from 'react';
import Calendar from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { toJalaali } from 'jalaali-js';

export default function Step2SchoolInfo({ data, onChange }) {
  const todayJalali = toJalaali(new Date());
const [selectedDay, setSelectedDay] = useState(null);
  useEffect(() => {
    if (data.schoolInfo?.visitDate) {
      const [year, month, day] = data.schoolInfo.visitDate.split('/').map(Number);
      setSelectedDay({ year, month, day });
    }
  }, [data.schoolInfo?.visitDate]);
  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      value={
        selectedDay
          ? `${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`
          : ''
      }
      placeholder="انتخاب تاریخ بازدید"
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  );
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2">مرحله ۲: اطلاعات هنرستان</h3>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <label className="flex flex-col lg:col-span-2">
        <span className="mb-1">نام هنرستان</span>
        <input
          type="text"
          value={data.schoolInfo?.name || ''}
          onChange={(e) => onChange(['schoolInfo', 'name'], e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="نام هنرستان"
        />
      </label>
      <label className="flex flex-col">
        <span className="mb-1">تلفن هنرستان</span>
        <input
          type="tel"
          maxLength="11"
          value={data.schoolInfo?.phone || ''}
          onChange={(e) => onChange(['schoolInfo', 'phone'], e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="مثلاً 011-..."
        />
      </label>
</div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <label className="flex flex-col">
  <span className="mb-1">شاخه</span>
  <select
    value={data.schoolInfo?.branch || ''}
    onChange={(e) => onChange(['schoolInfo', 'branch'], e.target.value)}
    className="border rounded px-3 py-2"
  >
    <option value="fani">فنی و حرفه ای</option>
    <option value="kar">کاردانش</option>
  </select>
</label>




   <label className="flex flex-col">
  <span className="mb-1">دخترانه یا پسرانه</span>
  <select
    value={data.schoolInfo?.gb || ''}
    onChange={(e) => onChange(['schoolInfo', 'gb'], e.target.value)}
    className="border rounded px-3 py-2"
  >
    <option value="girl">دخترانه</option>
    <option value="boy">پسرانه</option>
  </select>
</label>

<label className="flex flex-col">
  <span className="mb-1">نوع هنرستان</span>
  <select
    value={data.schoolInfo?.sch_type || 'dolati'}
    onChange={(e) => onChange(['schoolInfo', 'sch_type'], e.target.value)}
    className="border rounded px-3 py-2"
  >
    <option value="dolati">دولتی</option>
    <option value="gheir">غیرانتفاعی</option>
    <option value="nemoone">نمونه</option>
    <option value="shahed">شاهد</option>
    <option value="omana">هیات امنایی</option>
    <option value="sampad">سمپاد</option>
  </select>
</label>

</div>


    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      <label className="flex flex-col">
        <span className="mb-1">سال تحصیلی</span>
        <input
          type="text"
          value="1404-1405"
          disabled
          className="border rounded px-3 py-2"
          placeholder="مثلاً 1403-1404"
        />
      </label>




<label className="flex flex-col">
      <span className="mb-1">تاریخ بازدید</span>
      <Calendar
        value={selectedDay}
        onChange={(value) => {
          setSelectedDay(value);
          const formatted = value
            ? `${value.year}/${value.month}/${value.day}`
            : '';
          onChange(['schoolInfo', 'visitDate'], formatted);
        }}
        shouldHighlightWeekends
        locale="fa"
        colorPrimary="#0f62fe"
        renderInput={renderCustomInput}
      />
    </label>


</div>


    </div>
  );
}
