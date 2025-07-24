import React, { useState } from 'react';
import FileUploadBox from './FileUploadBox';
import UploadModalTeacher from './UploadModal_Teacher';
import UploadModalStudent from './UploadModal_Student';
import UploadModalBoth from './UploadModal_Both';
import UploadModal from './UploadModal';
import SchoolVisitButtonWithModal from './SchoolVisitButtonWithModal';
import axios from 'axios';
import VisitList from '../county/VisitList';


const FileUploadPage = ({ audience = "both", user }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";

  const handleFileAccepted = (file) => {
    setUploadedFile(file);
    setShowModal(true);
  };

  const handleModalSubmit = async (file, formData) => {
    if (!file?.name?.endsWith('.xlsx')) {
      alert("لطفا فقط فایل Excel با پسوند .xlsx انتخاب کنید!");
      return;
    }
  
    const data = new FormData();
    const cleanedFormData = { ...formData };
    delete cleanedFormData.county;
    delete cleanedFormData.area;
  
    data.append('file', file);
    data.append('county', user.county);
    data.append('area', user.area);
    Object.entries(cleanedFormData).forEach(([key, value]) => {
      data.append(key, value);
    });
  
    try {
      await axios.post(`${backendUrl}/programs/upload_file/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('فایل با موفقیت ارسال شد');
      setShowModal(false);
      setUploadedFile(null);
    } catch (error) {
        console.error('خطا در ارسال فایل', error);

  // بررسی کن که پاسخ سرور وجود داره و پیام خطا داره
  if (error.response && error.response.data && error.response.data.error) {
    alert(error.response.data.error);
  } else {
    alert('خطای نامشخص رخ داده است.');
  }
    }

    setRefreshKey(prev => prev + 1);
  };
  
 
  let ModalComponent = UploadModal;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
<div className="w-full px-4 mb-4 flex justify-end">
  <button
    onClick={() => {
      const downloadUrl = `${backendUrl}/media/base/kham.xlsx`;
      window.open(downloadUrl, '_blank');
    }}
    className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    title="دانلود فایل خام Excel"
  >
    دانلود فایل خام Excel
  </button>
</div>


      <h1 className="text-2xl font-bold mb-6">ارسال فایل به سامانه</h1>
      <FileUploadBox onFileAccepted={handleFileAccepted} />
      {showModal && uploadedFile && (
        <ModalComponent
          file={uploadedFile}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        />
      )}
     

     <SchoolVisitButtonWithModal user={user} onSubmitSuccess={() => setRefreshKey(prev => prev + 1)} />


      <VisitList user={user} refreshKey={refreshKey}/>
    </div>

  
  );
};

export default FileUploadPage;
