import React from 'react';

export default function StepArtisansInfo({ data, onChange, onAdd, onRemove }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold mb-2">مرحله ۵: اطلاعات هنرآموزان</h3>

      {data.artisans?.map((item, index) => (
        <div key={index} className="border p-4 rounded shadow-sm relative">
          {data.artisans.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-2 left-2 text-red-500 text-sm"
            >
              حذف
            </button>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            <label className="flex flex-col mb-2">
              <span>سمت</span>
              <select
                value={item.role || ''}
                onChange={(e) => onChange(['artisans', index, 'role'], e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="">هنرآموز</option>
                <option value="1">دبیر</option>
                <option value="2">استادکار</option>
                <option value="3">هنرآموز غیرمرتبط</option>
                <option value="4">استادکار غیرمرتبط</option>
              </select>
            </label>


            <label className="flex flex-col">
              <span>نام</span>
              <input
                type="text"
                value={item.firstName || ''}
                onChange={(e) => onChange(['artisans', index, 'firstName'], e.target.value)}
                className="border rounded px-3 py-2"
              />
            </label>


            <label className="flex flex-col">
              <span>نام خانوادگی</span>
              <input
                type="text"
                value={item.lastName || ''}
                onChange={(e) => onChange(['artisans', index, 'lastName'], e.target.value)}
                className="border rounded px-3 py-2"
              />
            </label>


            <label className="flex flex-col">
              <span>مدرک تحصیلی</span>
              <input
                type="text"
                value={item.degree || ''}
                onChange={(e) => onChange(['artisans', index, 'degree'], e.target.value)}
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span>رشته تحصیلی</span>
              <input
                type="text"
                value={item.field || ''}
                onChange={(e) => onChange(['artisans', index, 'field'], e.target.value)}
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span>کد پرسنلی</span>
              <input
                type="text"
                value={item.personalCode || ''}
                onChange={(e) => onChange(['artisans', index, 'personalCode'], e.target.value)}
                className="border rounded px-3 py-2"
                maxLength="8"
              />
            </label>

            <label className="flex flex-col">
              <span>سابقه تدریس (سال)</span>
              <input
                type="number"
                maxLength="2"
                value={item.experience || ''}
                onChange={(e) => onChange(['artisans', index, 'experience'], e.target.value)}
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span>ساعات تدریس در هفته</span>
              <input
                type="number"
                maxLength="2"
                value={item.hoursPerWeek || ''}
                onChange={(e) => onChange(['artisans', index, 'hoursPerWeek'], e.target.value)}
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col">
              <span>شماره همراه</span>
              <input
                type="text"
                maxLength="11"
                value={item.phone || ''}
                onChange={(e) => onChange(['artisans', index, 'phone'], e.target.value)}
                className="border rounded px-3 py-2"
              />
            </label>

            <label className="flex flex-col col-span-2">
              <span>نام درس‌هایی که تدریس می‌شود</span>
              <input
                type="text"
                value={item.courses || ''}
                onChange={(e) => onChange(['artisans', index, 'courses'], e.target.value)}
                className="border rounded px-3 py-2"
              />
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="border px-4 py-2 rounded bg-green-500 text-white mt-4 self-start"
      >
        + افزودن هنرآموز دیگر
      </button>
    </div>
  );
}
