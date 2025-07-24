import React, { useState } from 'react';

const UploadModal = ({ file, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    personnel_code: '',
    title: '',
    school_name: '',
    county: '',
    is_student: false,
    facilitator_first_name: '',
    facilitator_last_name: '',
    facilitator_personnel_code: '',
    description: '',
  });

  const [groupMembers, setGroupMembers] = useState([
    { first_name: '', last_name: '', is_student: true }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGroupChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updated = [...groupMembers];
    updated[index][name] = type === 'checkbox' ? checked : value;
    setGroupMembers(updated);
  };

  const addGroupMember = () => {
    setGroupMembers([...groupMembers, { first_name: '', last_name: '', is_student: true }]);
  };

  const handleSubmit = () => {
    onSubmit(file, formData, groupMembers);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">مشخصات هنرآموز صاحب اثر:</h2>

        <div className="grid grid-cols-2 gap-4 text-right">
          <input name="first_name" onChange={handleChange} placeholder="نام" className="border p-2 rounded" />
          <input name="last_name" onChange={handleChange} placeholder="نام خانوادگی" className="border p-2 rounded" />
          <input name="personnel_code" onChange={handleChange} placeholder="کد پرسنلی" className="border p-2 rounded" />
          <input name="title" onChange={handleChange} placeholder="عنوان" className="border p-2 rounded" />
          <input name="school_name" onChange={handleChange} placeholder="نام هنرستان" className="border p-2 rounded" />
          <input name="county" onChange={handleChange} placeholder="شهرستان" className="border p-2 rounded" />
          <textarea name="description" onChange={handleChange} placeholder="توضیحات" className="border p-2 rounded col-span-2" />
        </div>

        <div className="col-span-2 mt-4">
          <h3 className="text-right font-bold mb-2">هم‌گروهی‌ها</h3>
          {groupMembers.map((member, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2 items-center">
              <input
                type="text"
                name="first_name"
                value={member.first_name}
                onChange={(e) => handleGroupChange(index, e)}
                placeholder="نام"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="last_name"
                value={member.last_name}
                onChange={(e) => handleGroupChange(index, e)}
                placeholder="نام خانوادگی"
                className="border p-2 rounded"
              />
   
            </div>
          ))}
          <button
            type="button"
            onClick={addGroupMember}
            className="text-blue-600 mt-2 underline text-sm"
          >
            + افزودن هم‌گروهی
          </button>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">ارسال</button>
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">انصراف</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
