import React from 'react';

export default function Step6WorkshopAssessment({ data, onChange }) {
  const path = ['workshopAssessment'];

  return (
    <>
       <h3 className="text-sm mb-2 text-center">
         نظام آراستگی محیط کار (5S) {'>'} استانداردسازی 
      </h3>
   {/* 33 */}
<label className="flex flex-col">
  <span>علامت گذاری محدوده های خطر</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.dangerZoneMarking || ''}
      onChange={(e) => onChange([...path, 'dangerZoneMarking'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
      <option value="بله">بله</option>
      <option value="خیر">خیر</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.dangerZoneMarkingDes || ''}
      onChange={(e) => onChange([...path, 'dangerZoneMarkingDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 34 */}
<label className="flex flex-col">
  <span>استفاده از تجهیزات ایمنی</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.safetyEquipmentUsage || ''}
      onChange={(e) => onChange([...path, 'safetyEquipmentUsage'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
    <option value="بله">بله</option>
      <option value="خیر">خیر</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.safetyEquipmentUsageDes || ''}
      onChange={(e) => onChange([...path, 'safetyEquipmentUsageDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 35 */}
<label className="flex flex-col">
  <span>استفاده از پرده های مناسب</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.properCurtainsUsage || ''}
      onChange={(e) => onChange([...path, 'properCurtainsUsage'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
      <option value="بله">بله</option>
      <option value="خیر">خیر</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.properCurtainsUsageDes || ''}
      onChange={(e) => onChange([...path, 'properCurtainsUsageDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>
   
    </>
  );
}


