import React, { useState, useRef } from 'react';

const FileUploadBox = ({ onFileAccepted }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    validateFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateFile(file);
  };

  const validateFile = (file) => {
    if (!file) return;
    const allowedTypes = [
      'application/vnd.ms-excel', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    ];
    if (allowedTypes.includes(file.type)) {
      onFileAccepted(file);
    } else {
      alert('فقط فایل‌های اکسل قابل قبول هستند');
    }
  };

  return (
    <div
      className={`
        w-64 h-64 rounded-lg border-2 transition-all duration-300
        flex items-center justify-center text-center
        cursor-pointer bg-white
        ${isDragging ? 'border-blue-500 bg-blue-10' : 'border-gray-300 border-dashed'}
        hover:border-blue-400 hover:bg-blue-50
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xls,.xlsx"
        style={{ display: 'none' }}
      />
      <p className="text-gray-500">
        فایل اکسل را بکشید و رها کنید<br />یا کلیک کنید برای انتخاب
      </p>
    </div>
  );
};

export default FileUploadBox;
