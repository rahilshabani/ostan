import React from 'react';

export default function Step6WorkshopAssessment({ data, onChange }) {
  const path = ['workshopAssessment'];

  return (
  <>
      <h3 className="text-sm mb-2 text-center">
        برنامه‌ریزی آموزشی {'>'} مخصوص شاخه فنی و حرفه ای 
      </h3>
<label className="flex flex-col">
  <span>تدریس درس دانش فني پایه توسط هنرآموز رشته کامپیوتر</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.technicalTeaching || 'بله'}
      onChange={(e) => onChange([...path, 'technicalTeaching'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
      <option value="بله">بله</option>
      <option value="خیر">خیر</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.technicalTeachingDes || ''}
      onChange={(e) => onChange([...path, 'technicalTeachingDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 10 */}
<label className="flex flex-col">
  <span>تجهیزات موردنیاز دروس پایه دوازدهم (دوربین، روتر، اینترنت و ...)</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.grade12Equipment || 'متوسط'}
      onChange={(e) => onChange([...path, 'grade12Equipment'], e.target.value)}
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
      value={data.workshopAssessment?.grade12EquipmentDes || ''}
      onChange={(e) => onChange([...path, 'grade12EquipmentDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 11 */}
<label className="flex flex-col">
  <span>تجهیزات سخت‌افزاری مورد نیاز دروس پایه دهم (مادربورد، سی پی یو و ...)</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.grade10Hardware || 'متوسط'}
      onChange={(e) => onChange([...path, 'grade10Hardware'], e.target.value)}
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
      value={data.workshopAssessment?.grade10HardwareDes || ''}
      onChange={(e) => onChange([...path, 'grade10HardwareDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 12 */}
<label className="flex flex-col">
  <span>تدریس دروس شایستگی های غیرفنی توسط هنرآموز رشته کامپیوتر</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.nonTechnicalTeaching || 'متوسط'}
      onChange={(e) => onChange([...path, 'nonTechnicalTeaching'], e.target.value)}
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
      value={data.workshopAssessment?.nonTechnicalTeachingDes || ''}
      onChange={(e) => onChange([...path, 'nonTechnicalTeachingDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

  </>
  );
}