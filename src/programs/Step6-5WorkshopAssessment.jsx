import React from 'react';

export default function Step6WorkshopAssessment({ data, onChange }) {
  const path = ['workshopAssessment'];

  return (
    <>
       <h3 className="text-sm mb-2 text-center">
         نظام آراستگی محیط کار (5S) {'>'} نظم و ترتیب و ساماندهی 
      </h3>
      {/* 28 */}
<label className="flex flex-col">
  <span>مرتب بودن چیدمان و آراستگی ظاهری کارگاه‌ها</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.workshopNeatness || 'متوسط'}
      onChange={(e) => onChange([...path, 'workshopNeatness'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
       <option value="خیلی کم">خیلی کم</option>
            <option value="کم">کم</option>
            <option value="متوسط" selected>متوسط</option>
            <option value="خوب">خوب</option>
            <option value="خیلی خوب">خیلی خوب</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.workshopNeatnessDes || ''}
      onChange={(e) => onChange([...path, 'workshopNeatnessDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 29 */}
<label className="flex flex-col">
  <span>شماره گذاری کلیه سیستم ها</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.systemNumbering || ''}
      onChange={(e) => onChange([...path, 'systemNumbering'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
      <option value="بله">بله</option>
      <option value="خیر">خیر</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.systemNumberingDes || ''}
      onChange={(e) => onChange([...path, 'systemNumberingDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 30 */}
<label className="flex flex-col">
  <span>نصب مشخصات سخت افزاری سیستم‌ها</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.systemSpecsLabeling || ''}
      onChange={(e) => onChange([...path, 'systemSpecsLabeling'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
      <option value="بله">بله</option>
      <option value="خیر">خیر</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.systemSpecsLabelingDes || ''}
      onChange={(e) => onChange([...path, 'systemSpecsLabelingDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 31 */}
<label className="flex flex-col">
  <span>نظم و ترتیب در تابلوی اعلانات</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.noticeBoardOrder || ''}
      onChange={(e) => onChange([...path, 'noticeBoardOrder'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
     <option value="بله">بله</option>
      <option value="خیر">خیر</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.noticeBoardOrderDes || ''}
      onChange={(e) => onChange([...path, 'noticeBoardOrderDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

    </>
  );
}


