import React, { useEffect } from 'react';

export default function Step4ClassesInfo({ data, onChange, onAdd, onRemove }) {

  // اگر هیچ رشته‌ای وجود نداشت، یکی اضافه کن (فقط یک‌بار)
  useEffect(() => {
    if (!data.classes || data.classes.length === 0) {
      onAdd();
    }
  }, [data.classes, onAdd]);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold mb-2">مرحله ۴: اطلاعات کلاس‌ها و هنرجویان</h3>

      {data.classes?.map((item, index) => (
        <div key={index} className="border p-4 rounded shadow-sm relative">
          {data.classes.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-2 left-2 text-red-500 text-sm"
            >
              حذف
            </button>
          )}

          <label className="flex flex-col mb-2">
            <span>رشته</span>
            <select
              value={item.major || ''}
              onChange={(e) => onChange(index, ['major'], e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="">انتخاب کنید</option>
              <option value="1">شبکه و نرم افزار</option>
              <option value="2">تولید و توسعه دهنده پایگاه‌های اینترنتی</option>
              <option value="3">عیب‌یابی و مونتاژ سیستم‌های رایانه‌ای</option>
              <option value="4">تولید محتوای آموزشی الکترونیکی</option>
              <option value="5">تصویرسازی دیجیتالی</option>
              <option value="6">برنامه‌نویسی پایگاه داده</option>
              <option value="7">تولیدکننده چندرسانه‌ای</option>
            </select>
          </label>

          <div className="grid grid-cols-2 gap-4">
            {[['grade10Classes', 'تعداد کلاس‌های پایه ۱۰'],
              ['grade10Students', 'تعداد هنرجویان پایه ۱۰'],
              ['grade11Classes', 'تعداد کلاس‌های پایه ۱۱'],
              ['grade11Students', 'تعداد هنرجویان پایه ۱۱'],
              ['grade12Classes', 'تعداد کلاس‌های پایه ۱۲'],
              ['grade12Students', 'تعداد هنرجویان پایه ۱۲'],
              ['activeWorkshops', 'تعداد کارگاه‌های فعال'],
              ['totalDevices', 'تعداد کل دستگاه‌های فعال']].map(([field, label]) => (
              <label key={field} className="flex flex-col">
                <span>{label}</span>
                <input
                  type="number"
                  value={item[field] || ''}
                  onChange={(e) => onChange(index, [field], e.target.value)}
                  className="border rounded px-3 py-2"
                />
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="border px-4 py-2 rounded bg-green-500 text-white mt-4 self-start"
      >
        + افزودن رشته دیگر
      </button>
    </div>
  );
}
