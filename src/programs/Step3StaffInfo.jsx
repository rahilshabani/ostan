import React from 'react';

function PersonFields({ title, data, onChange, path }) {
  return (
    <div className="border rounded p-4 mb-4">
      <h4 className="font-bold mb-2">{title}</h4>

      <div className="grid gap-3">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        <label className="flex flex-col">
          <span>نام</span>
          <input
            type="text"
            value={data?.firstName || ''}
            onChange={(e) => onChange([...path, 'firstName'], e.target.value)}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col">
          <span>نام خانوادگی</span>
          <input
            type="text"
            value={data?.lastName || ''}
            onChange={(e) => onChange([...path, 'lastName'], e.target.value)}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col">
          <span>کد پرسنلی</span>
          <input
            type="text"
            maxLength="8"
            value={data?.personalCode || ''}
            onChange={(e) => onChange([...path, 'personalCode'], e.target.value)}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col">
          <span>شماره همراه</span>
          <input
            type="tel"
            maxLength="11"
            value={data?.phone || ''}
            onChange={(e) => onChange([...path, 'phone'], e.target.value)}
            className="border rounded px-3 py-2"
          />
        </label>
</div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      

        <label className="flex flex-col">
          <span>مدرک تحصیلی</span>
          <select
            value={data?.degree || 'کارشناسی ارشد'}
            onChange={(e) => onChange([...path, 'degree'], e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="کاردانی">کاردانی</option>
            <option value="کارشناسی">کارشناسی</option>
            <option value="کارشناسی ارشد">کارشناسی ارشد</option>
            <option value="">دکتری</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span>رشته تحصیلی</span>
          <input
            type="text"
            value={data?.field || ''}
            onChange={(e) => onChange([...path, 'field'], e.target.value)}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="flex flex-col">
          <span>رشته فنی هست؟</span>
          <select
            value={data?.isTechnical || ''}
            onChange={(e) => onChange([...path, 'isTechnical'], e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="بله">بله</option>
            <option value="خیر">خیر</option>
          </select>
        </label>

        </div>
      </div>
    </div>
  );
}

export default function Step3StaffInfo({ data, onChange }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2">مرحله ۳: اطلاعات مدیران و سرپرست</h3>

      <PersonFields
        title="مدیر هنرستان"
        data={data.staff?.manager}
        onChange={onChange}
        path={['staff', 'manager']}
      />

      <PersonFields
        title="معاون فنی هنرستان"
        data={data.staff?.assistant}
        onChange={onChange}
        path={['staff', 'assistant']}
      />

      <PersonFields
        title="سرپرست بخش هنرستان"
        data={data.staff?.supervisor}
        onChange={onChange}
        path={['staff', 'supervisor']}
      />
    </div>
  );
}
