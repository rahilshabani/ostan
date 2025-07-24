import React from 'react';

export default function Step6WorkshopAssessment({ data, onChange }) {
  const path = ['workshopAssessment'];

  return (
    <>
       <h3 className="text-sm mb-2 text-center">
         نظام آراستگی محیط کار (5S) {'>'} انضباط 
      </h3>
      {/* 36 */}
<label className="flex flex-col">
  <span>لباس فرم مناسب در کارگاه</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.properWorkAttire || ''}
      onChange={(e) => onChange([...path, 'properWorkAttire'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
     <option value="بله">بله</option>
      <option value="خیر">خیر</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.properWorkAttireDes || ''}
      onChange={(e) => onChange([...path, 'properWorkAttireDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

    </>
  );
}


