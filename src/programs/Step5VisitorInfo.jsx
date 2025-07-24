import React from 'react';

export default function Step5VisitorInfo({ data, onChange }) {
  const path = ['visitorInfo'];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2">مرحله ۶: اطلاعات بازدیدکننده</h3>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <label className="flex flex-col">
        <span>نام</span>
        <input
          type="text"
          value={data.visitorInfo?.visitor_firstname || ''}
          onChange={(e) => onChange([...path, 'visitor_firstname'], e.target.value)}
          className="border rounded px-3 py-2"
        />
      </label>

      <label className="flex flex-col">
        <span>نام خانوادگی</span>
        <input
          type="text"
          value={data.visitorInfo?.visitor_lastname || ''}
          onChange={(e) => onChange([...path, 'visitor_lastname'], e.target.value)}
          className="border rounded px-3 py-2"
        />
      </label>

        <label className="flex flex-col">
        <span>کدپرسنلی</span>
        <input
          type="text"
          value={data.visitorInfo?.code || ''}
          onChange={(e) => onChange([...path, 'code'], e.target.value)}
          className="border rounded px-3 py-2"
        />
      </label>
      </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


          <label className="flex flex-col">
        <span>سمت در گروه های آموزشی</span>
        <input
          type="text"
          value={data.visitorInfo?.position || ''}
          onChange={(e) => onChange([...path, 'position'], e.target.value)}
          className="border rounded px-3 py-2"
        />
      </label>


      <label className="flex flex-col">
        <span>شماره همراه</span>
        <input
          type="tel"
          value={data.visitorInfo?.phone || ''}
          onChange={(e) => onChange([...path, 'phone'], e.target.value)}
          className="border rounded px-3 py-2"
        />
      </label>

  </div>

     

    </div>
  );
}
