import React from 'react';

export default function Step6WorkshopAssessment({ data, onChange }) {
  const path = ['workshopAssessment'];

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2">مرحله ۷: ارزیابی کارگاه‌ها</h3>
      <h3 className="text-sm mb-2 text-center">
        برنامه‌ریزی آموزشی {'>'} برنامه‌ریزی آموزشی و وضعیت کارگاه
      </h3>


      {/* 1 */}
      <label className="flex flex-col">
        <span>میزان رعایت استاندارد تعداد هنرجویان در کارگاه‌ها با توجه به تعداد هنرآموزان و استادکاران مربوطه</span>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <select
            value={data.workshopAssessment?.physicalSpace || 'متوسط'}
            onChange={(e) => onChange([...path, 'physicalSpace'], e.target.value)}
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
            value={data.workshopAssessment?.physicalSpaceDes || ''}
            onChange={(e) => onChange([...path, 'physicalSpaceDes'], e.target.value)}
            className="border rounded px-3 py-2 lg:col-span-3"
            placeholder="توضیحات تکمیلی"
          />
        </div>
      </label>

      {/* 2 */}
      <label className="flex flex-col">
        <span>وضعیت تجهیزات کارگاهی: وجود تجهیزات ذکر شده در لیست تجهیزات مورد نیاز کارگاه‌ها برای رشته</span>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <select
            value={data.workshopAssessment?.equipment || 'متوسط'}
            onChange={(e) => onChange([...path, 'equipment'], e.target.value)}
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
            value={data.workshopAssessment?.equipmentDes || ''}
            onChange={(e) => onChange([...path, 'equipmentDes'], e.target.value)}
            className="border rounded px-3 py-2 lg:col-span-3"
            placeholder="توضیحات تکمیلی"
          />
        </div>
      </label>

      {/* 3 */}
      <label className="flex flex-col">
        <span>آمادگی کامپیوترها: وجود نرم‌افزارهای لازم و میزان کارایی کامپیوترها</span>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <select
            value={data.workshopAssessment?.safety || 'متوسط'}
            onChange={(e) => onChange([...path, 'safety'], e.target.value)}
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
            value={data.workshopAssessment?.safetyDes || ''}
            onChange={(e) => onChange([...path, 'safetyDes'], e.target.value)}
            className="border rounded px-3 py-2 lg:col-span-3"
            placeholder="توضیحات تکمیلی"
          />
        </div>
      </label>

      {/* 4 */}
      <label className="flex flex-col">
        <span>میزان فعال بودن کتابخانه تخصصی رشته کامپیوتر در هنرستان و کتاب‌های آموزشی و کمک درسی کامپیوتر</span>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <select
            value={data.workshopAssessment?.libraryliness || 'متوسط'} 
            onChange={(e) => onChange([...path, 'libraryliness'], e.target.value)}
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
            value={data.workshopAssessment?.librarylinessDes || ''}
            onChange={(e) => onChange([...path, 'librarylinessDes'], e.target.value)}
            className="border rounded px-3 py-2 lg:col-span-3"
            placeholder="توضیحات تکمیلی"
          />
        </div>
      </label>

      {/* 5 */}
      <label className="flex flex-col">
        <span>وجود بانک نرم‌افزاری در دسترس</span>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <select
            value={data.workshopAssessment?.softwareBank || 'متوسط'}
            onChange={(e) => onChange([...path, 'softwareBank'], e.target.value)}
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
            value={data.workshopAssessment?.softwareBankDes || ''}
            onChange={(e) => onChange([...path, 'softwareBankDes'], e.target.value)}
            className="border rounded px-3 py-2 lg:col-span-3"
            placeholder="توضیحات تکمیلی"
          />
        </div>
      </label>

      {/* 6 */}
      <label className="flex flex-col">
        <span>انجام فعالیت‌های تکمیلی آموزشی توسط کادر اجرایی هنرستان (تشکیل گروه آموزشی، آلبوم آثار، جزوات کمک آموزشی، بازدید، نمایشگاه و ...)</span>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <select
            value={data.workshopAssessment?.educationalActivities || 'متوسط'}
            onChange={(e) => onChange([...path, 'educationalActivities'], e.target.value)}
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
            value={data.workshopAssessment?.educationalActivitiesDes || ''}
            onChange={(e) => onChange([...path, 'educationalActivitiesDes'], e.target.value)}
            className="border rounded px-3 py-2 lg:col-span-3"
            placeholder="توضیحات تکمیلی"
          />
        </div>
      </label>

      {/* 7 */}
      <label className="flex flex-col">
        <span>نصب پوستر تجهیزات در کارگاه</span>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <select
            value={data.workshopAssessment?.poster || 'بله'}
            onChange={(e) => onChange([...path, 'poster'], e.target.value)}
            className="border rounded px-3 py-2 lg:col-span-1"
          >
            <option value="بله">بله</option>
            <option value="خیر">خیر</option>
          </select>
          <input
            type="text"
            value={data.workshopAssessment?.posterDes || ''}
            onChange={(e) => onChange([...path, 'posterDes'], e.target.value)}
            className="border rounded px-3 py-2 lg:col-span-3"
            placeholder="توضیحات تکمیلی"
          />
        </div>
      </label>

      {/* 8 */}
      <label className="flex flex-col">
        <span>نصب برنامه هفتگی استفاده از کارگاه های کامپیوتر</span>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <select
            value={data.workshopAssessment?.schedule || 'بله'}
            onChange={(e) => onChange([...path, 'schedule'], e.target.value)}
            className="border rounded px-3 py-2 lg:col-span-1"
          >
            <option value="بله">بله</option>
            <option value="خیر">خیر</option>
          </select>
          <input
            type="text"
            value={data.workshopAssessment?.scheduleDes || ''}
            onChange={(e) => onChange([...path, 'scheduleDes'], e.target.value)}
            className="border rounded px-3 py-2 lg:col-span-3"
            placeholder="توضیحات تکمیلی"
          />
        </div>
      </label>
    </div>
  );
}