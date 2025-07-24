import React from 'react';

export default function Step6WorkshopAssessment({ data, onChange }) {
  const path = ['workshopAssessment'];

  return (
    <>
     <h3 className="text-sm mb-2 text-center">
        رضایت مندی {'>'} هنرآموزان 
      </h3>
{/* 16 */}
<label className="flex flex-col">
  <span>میزان رضایت هنرآموزان از کیفیت تجهیزات</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.teachersEquipmentQualitySatisfaction || 'متوسط'}
      onChange={(e) => onChange([...path, 'teachersEquipmentQualitySatisfaction'], e.target.value)}
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
      value={data.workshopAssessment?.teachersEquipmentQualitySatisfactionDes || ''}
      onChange={(e) => onChange([...path, 'teachersEquipmentQualitySatisfactionDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 17 */}
<label className="flex flex-col">
  <span>میزان رضایت هنرآموزان از کمیت تجهیزات</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.teachersEquipmentQuantitySatisfaction || 'متوسط'}
      onChange={(e) => onChange([...path, 'teachersEquipmentQuantitySatisfaction'], e.target.value)}
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
      value={data.workshopAssessment?.teachersEquipmentQuantitySatisfactionDes || ''}
      onChange={(e) => onChange([...path, 'teachersEquipmentQuantitySatisfactionDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>


    </>
  );
}


