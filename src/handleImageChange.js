const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  
    // ساخت پیش‌نمایش لوکال
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);  // آدرس Base64
      };
      reader.readAsDataURL(file);
    }
  };
  