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
      <h2 className="text-xl font-bold mb-4">فایل بازدید شما با موفقیت بارگزاری شد</h2>
        

     

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">ارسال</button>
          {/* <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">باشه</button> */}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
