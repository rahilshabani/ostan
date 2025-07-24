import React from 'react';

export default function Step6WorkshopAssessment({ data, onChange }) {
  const path = ['workshopAssessment'];

  return (
    <>
       <h3 className="text-sm mb-2 text-center">
        رضایت مندی {'>'} هنرجویان 
      </h3>
    {/* 13 */}
<label className="flex flex-col">
  <span>میزان رضایت هنرجویان از نحوه تدریس</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.studentsTeachingSatisfaction || 'متوسط'}
      onChange={(e) => onChange([...path, 'studentsTeachingSatisfaction'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
      <option value="خیلی کم">خیلی کم</option>
            <option value="کم">کم</option>
            <option value="متوسط" selected>متوسط</option>
            <option value="زیاد">زیاد</option>
            <option value="خیلی زیاد">خیلی زیاد</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.studentsTeachingSatisfactionDes || ''}
      onChange={(e) => onChange([...path, 'studentsTeachingSatisfactionDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 14 */}
<label className="flex flex-col">
  <span>میزان رضایت هنرجویان از کیفیت و کمیت تجهیزات</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.studentsEquipmentSatisfaction || 'متوسط'}
      onChange={(e) => onChange([...path, 'studentsEquipmentSatisfaction'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
     <option value="خیلی کم">خیلی کم</option>
            <option value="کم">کم</option>
            <option value="متوسط" selected>متوسط</option>
            <option value="زیاد">زیاد</option>
            <option value="خیلی زیاد">خیلی زیاد</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.studentsEquipmentSatisfactionDes || ''}
      onChange={(e) => onChange([...path, 'studentsEquipmentSatisfactionDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 15 */}
<label className="flex flex-col">
  <span>میزان رضایت هنرجویان از برنامه‌ریزی آموزشی هنرستان</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.studentsPlanningSatisfaction || 'متوسط'}
      onChange={(e) => onChange([...path, 'studentsPlanningSatisfaction'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
       <option value="خیلی کم">خیلی کم</option>
            <option value="کم">کم</option>
            <option value="متوسط" selected>متوسط</option>
            <option value="زیاد">زیاد</option>
            <option value="خیلی زیاد">خیلی زیاد</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.studentsPlanningSatisfactionDes || ''}
      onChange={(e) => onChange([...path, 'studentsPlanningSatisfactionDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

    </>
  );
}


