import React from 'react';

export default function Step6WorkshopAssessment({ data, onChange }) {
  const path = ['workshopAssessment'];

  return (
    <>

     <h3 className="text-sm mb-2 text-center">
         نظام آراستگی محیط کار (5S) {'>'} استاندارد فضا و محیط کار 
      </h3>
      {/* 18 */}
<label className="flex flex-col">
  <span>ابعاد کارگاه نسبت به تعداد سیستم ها</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.workshopSize || 'مناسب است'}
      onChange={(e) => onChange([...path, 'workshopSize'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
      <option value="مناسب است">مناسب است</option>
      <option value="مناسب نیست">مناسب نیست</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.workshopSizeDes || ''}
      onChange={(e) => onChange([...path, 'workshopSizeDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 19 */}
<label className="flex flex-col">
  <span>کف پوش</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.flooring || 'مناسب است'}
      onChange={(e) => onChange([...path, 'flooring'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
      <option value="مناسب است">مناسب است</option>
      <option value="مناسب نیست">مناسب نیست</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.flooringDes || ''}
      onChange={(e) => onChange([...path, 'flooringDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 20 */}
<label className="flex flex-col">
  <span>وسایل روشنایی</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.lighting || ''}
      onChange={(e) => onChange([...path, 'lighting'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
            <option value="مناسب است">مناسب است</option>
      <option value="مناسب نیست">مناسب نیست</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.lightingDes || ''}
      onChange={(e) => onChange([...path, 'lightingDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 21 */}
<label className="flex flex-col">
  <span>سیستم اطفاء حریق اسپرینكلر</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.fireSuppression || ''}
      onChange={(e) => onChange([...path, 'fireSuppression'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
           <option value="مناسب است">مناسب است</option>
      <option value="مناسب نیست">مناسب نیست</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.fireSuppressionDes || ''}
      onChange={(e) => onChange([...path, 'fireSuppressionDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 22 */}
<label className="flex flex-col">
  <span>تجهیزات سرمایشی</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.coolingEquipment || ''}
      onChange={(e) => onChange([...path, 'coolingEquipment'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
            <option value="مناسب است">مناسب است</option>
      <option value="مناسب نیست">مناسب نیست</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.coolingEquipmentDes || ''}
      onChange={(e) => onChange([...path, 'coolingEquipmentDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 23 */}
<label className="flex flex-col">
  <span>تجهیزات گرمایشی</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.heatingEquipment || ''}
      onChange={(e) => onChange([...path, 'heatingEquipment'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
           <option value="مناسب است">مناسب است</option>
      <option value="مناسب نیست">مناسب نیست</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.heatingEquipmentDes || ''}
      onChange={(e) => onChange([...path, 'heatingEquipmentDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 24 */}
<label className="flex flex-col">
  <span>تجهیزات گرمایشی (۲)</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.heatingEquipment2 || ''}
      onChange={(e) => onChange([...path, 'heatingEquipment2'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
           <option value="مناسب است">مناسب است</option>
      <option value="مناسب نیست">مناسب نیست</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.heatingEquipment2Des || ''}
      onChange={(e) => onChange([...path, 'heatingEquipment2Des'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 25 */}
<label className="flex flex-col">
  <span>فیوز</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.fuse || ''}
      onChange={(e) => onChange([...path, 'fuse'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
            <option value="مناسب است">مناسب است</option>
      <option value="مناسب نیست">مناسب نیست</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.fuseDes || ''}
      onChange={(e) => onChange([...path, 'fuseDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 26 */}
<label className="flex flex-col">
  <span>پروژکتور</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.projector || ''}
      onChange={(e) => onChange([...path, 'projector'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
            <option value="مناسب است">مناسب است</option>
      <option value="مناسب نیست">مناسب نیست</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.projectorDes || ''}
      onChange={(e) => onChange([...path, 'projectorDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

{/* 27 */}
<label className="flex flex-col">
  <span>وجود شبكه محلی در کارگاه</span>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <select
      value={data.workshopAssessment?.localNetwork || ''}
      onChange={(e) => onChange([...path, 'localNetwork'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-1"
    >
            <option value="مناسب است">مناسب است</option>
      <option value="مناسب نیست">مناسب نیست</option>
    </select>
    <input
      type="text"
      value={data.workshopAssessment?.localNetworkDes || ''}
      onChange={(e) => onChange([...path, 'localNetworkDes'], e.target.value)}
      className="border rounded px-3 py-2 lg:col-span-3"
      placeholder="توضیحات تکمیلی"
    />
  </div>
</label>

    </>
  );
}


