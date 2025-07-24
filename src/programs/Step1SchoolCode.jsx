import React from 'react';

export default function Step1SchoolCode({ data, onChange }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2">مرحله ۱: وارد کردن کد هنرستان</h3>

      <label className="flex flex-col">
        <span className="mb-1">کد هنرستان</span>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={data.schoolCode}
          onChange={(e) => onChange(['schoolCode'], e.target.value)}
          placeholder="مثلاً 12345678"
          maxLength="8"
        />
      </label>
    </div>
  );
}


