import React from 'react';

export default function Step8ClinicalSupervisionForm({ data, onChange }) {
  const path = ['clinicalSupervision'];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2">مرحله ۸: فرم بازدید و نظارت بالینی</h3>

      <label className="flex flex-col">
        <span>عنوان جلسه</span>
        <input
          type="text"
          value={data.clinicalSupervision?.title || ''}
          onChange={(e) => onChange([...path, 'title'], e.target.value)}
          className="border rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col">
        <span>تاریخ بازدید</span>
        <input
          type="date"
          value={data.clinicalSupervision?.date || ''}
          onChange={(e) => onChange([...path, 'date'], e.target.value)}
          className="border rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col">
        <span>مدرسین مورد ارزیابی</span>
        <input
          type="text"
          value={data.clinicalSupervision?.teachers || ''}
          onChange={(e) => onChange([...path, 'teachers'], e.target.value)}
          className="border rounded px-3 py-2"
          placeholder="نام مدرسین با کاما جدا شود"
        />
      </label>

      <label className="flex flex-col">
        <span>نقاط قوت مشاهده‌شده</span>
        <textarea
          rows={3}
          value={data.clinicalSupervision?.strengths || ''}
          onChange={(e) => onChange([...path, 'strengths'], e.target.value)}
          className="border rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col">
        <span>پیشنهادات برای بهبود</span>
        <textarea
          rows={3}
          value={data.clinicalSupervision?.suggestions || ''}
          onChange={(e) => onChange([...path, 'suggestions'], e.target.value)}
          className="border rounded px-3 py-2"
        />
      </label>
    </div>
  );
}
