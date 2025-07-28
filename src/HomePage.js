import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Menu, X } from "lucide-react"; 
import axios from './axiosInstance';

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
  const BASE_MEDIA_URL = API_BASE_URL.replace("/api", "");
  const LOGO_URL = `${BASE_MEDIA_URL}media/base/logo.png`;

useEffect(() => {
  axios.get("media/api/videos/")
    .then((res) => setVideos(res.data.results || res.data || []))
    .catch((err) => console.error("خطا:", err));
}, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}media/api/gallery/`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGalleryImages(data);
          setCarouselImages(data.slice(0, 3).map((img) => img.image_url));
        } else {
          console.warn("ساختار پاسخ گالری نامعتبر است:", data);
          setGalleryImages([]);
        }
      })
      .catch((err) => console.error("خطا در دریافت تصاویر:", err));
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 min-h-screen">
      {/* Header */}
      <header className="text-white fixed top-0 w-full z-50 menu-gradient bg-opacity-90 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={LOGO_URL} alt="لوگو" className="w-10 h-10 rounded-full" loading="lazy" />
          <a href="/">
            <h1 className="text-xl font-bold">گروه کامپیوتر استان مازندران</h1>
          </a>
        </div>

        {/* همبرگر منو برای موبایل */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* منوی دسکتاپ */}
        <nav className="hidden md:flex flex-row-reverse space-x-6 space-x-reverse">
          <a href="/" className="hover:text-yellow-300 transition font-bold">خانه</a>
          <a href="/login/" className="hover:text-yellow-300 transition">پنل کاربری</a>
          <a href="#" className="hover:text-yellow-300 transition">درباره ما</a>
        </nav>
      </header>

      {/* منوی موبایل */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-full bg-blue-700 text-white flex flex-col items-end px-6 py-4 space-y-4 z-40">
          <a href="/" className="hover:text-yellow-300 font-bold">خانه</a>
          <a href="/login/" className="hover:text-yellow-300">پنل کاربری</a>
          <a href="#" className="hover:text-yellow-300">درباره ما</a>
        </div>
      )}

      {/* Carousel */}
      <div className="max-w-4xl mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          {carouselImages.length > 0 && (
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              interval={4000}
              showStatus={false}
              showArrows={false}
              stopOnHover={false}
              dynamicHeight={false}
            >
              {carouselImages.map((src, index) => (
                <div key={index}>
                  <img
                    src={src}
                    loading="lazy"
                    alt={`slide-${index}`}
                    className="w-full object-cover"
                    style={{ maxHeight: "400px", height: "100%" }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>

      {/* Video Intro */}
      <section className="flex flex-col justify-center items-center px-4 py-16 bg-gradient-to-b from-black via-slate-900 to-slate-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">ویدئوی معرفی</h2>
        <div className="w-full max-w-6xl h-[75vh] rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="ویدئو معرفی"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Educational Videos */}
      <section className="max-w-6xl mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          ویدئوهای آموزشی ویژه هنرآموزان و هنرجویان
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(videos) && videos.length > 0 ? (
            videos.map((video, index) => (
              <div
                key={index}
                className="aspect-video rounded-xl overflow-hidden shadow-xl bg-slate-800"
              >
                <iframe
                  className="w-full h-full"
                  src={video.embed_url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              هیچ ویدیویی برای نمایش وجود ندارد.
            </p>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">گالری تصاویر</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(galleryImages) && galleryImages.length > 0 ? (
            galleryImages.map((img) => (
              <img
              loading="lazy"
                key={img.id}
                src={img.image_url}
                alt={img.title}
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300 w-full h-48 object-cover"
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              تصویری برای نمایش وجود ندارد.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 menu-gradient backdrop-blur-sm mt-12">
        <p className="text-sm text-white">
          © {new Date().getFullYear()} گروه کامپیوتر مازندران. تمام حقوق محفوظ است.
        </p>
      </footer>
    </div>
  );
}
