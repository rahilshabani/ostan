import React from 'react';

export default function Step7SummarySubmit({ data, onSubmit }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2">مرحله ۷: مرور و ارسال</h3>
      <div className="border rounded p-4 bg-gray-50 text-sm leading-relaxed">
        <h4 className="font-bold mb-2">🟣 کد مدرسه</h4>
        <p>{data.schoolCode || 'وارد نشده'}</p>

        <h4 className="font-bold mt-4 mb-2">🟣 اطلاعات مدرسه</h4>
        <p>نام: {data.schoolInfo?.name || '-'}</p>
        <p>نوع: {data.schoolInfo?.type || '-'}</p>
        <p>استان: {data.schoolInfo?.province || '-'}</p>
        <p>شهرستان: {data.schoolInfo?.county || '-'}</p>

        <h4 className="font-bold mt-4 mb-2">🟣 اطلاعات پرسنل</h4>
        {data.staffInfo?.length ? (
          <ul className="list-disc pl-5">
            {data.staffInfo.map((staff, idx) => (
              <li key={idx}>{staff.name} - {staff.role}</li>
            ))}
          </ul>
        ) : <p>-</p>}

        <h4 className="font-bold mt-4 mb-2">🟣 کلاس‌ها</h4>
        {data.classesInfo?.length ? (
          <ul className="list-disc pl-5">
            {data.classesInfo.map((cls, idx) => (
              <li key={idx}>{cls.name} - {cls.capacity} نفر</li>
            ))}
          </ul>
        ) : <p>-</p>}

        <h4 className="font-bold mt-4 mb-2">🟣 اطلاعات بازدیدکننده</h4>
        <p>نام: {data.visitorInfo?.fullName || '-'}</p>
        <p>شماره همراه: {data.visitorInfo?.phone || '-'}</p>
        <p>سمت: {data.visitorInfo?.position || '-'}</p>
        <p>استان: {data.visitorInfo?.province || '-'}</p>
        <p>شهرستان: {data.visitorInfo?.county || '-'}</p>

        <h4 className="font-bold mt-4 mb-2">🟣 ارزیابی کارگاه</h4>
        <p>فضا: {data.workshopAssessment?.physicalSpace || '-'}</p>
        <p>تجهیزات: {data.workshopAssessment?.equipment || '-'}</p>
        <p>ایمنی: {data.workshopAssessment?.safety || '-'}</p>
        <p>نظافت: {data.workshopAssessment?.cleanliness || '-'}</p>
        <p>توضیحات: {data.workshopAssessment?.comments || '-'}</p>
      </div>

      <button
        onClick={onSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 transition"
      >
        ارسال نهایی
      </button>
    </div>
  );
}
