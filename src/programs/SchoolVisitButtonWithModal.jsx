import React, { useState } from 'react';
import axios from 'axios';
import Step1SchoolCode from './Step1SchoolCode';
import Step2SchoolInfo from './Step2SchoolInfo';
import Step3StaffInfo from './Step3StaffInfo';
import Step31TeacherInfo from './Step3-1TeacherInfo';
import Step4ClassesInfo from './Step4ClassesInfo';
import Step5VisitorInfo from './Step5VisitorInfo';
import Step6WorkshopAssessment from './Step6WorkshopAssessment';
import Step61WorkshopAssessment from './Step6-1WorkshopAssessment';
import Step62WorkshopAssessment from './Step6-2WorkshopAssessment';
import Step63WorkshopAssessment from './Step6-3WorkshopAssessment';
import Step64WorkshopAssessment from './Step6-4WorkshopAssessment';
import Step65WorkshopAssessment from './Step6-5WorkshopAssessment';
import Step66WorkshopAssessment from './Step6-6WorkshopAssessment';
import Step67WorkshopAssessment from './Step6-7WorkshopAssessment';
import Step68WorkshopAssessment from './Step6-8WorkshopAssessment';
import Step7SummarySubmit from './Step7SummarySubmit';
import Step8ClinicalSupervisionForm from './Step8ClinicalSupervisionForm';
import AssessmentItem from './Step7Balini';
import { toJalaali } from 'jalaali-js';

export default function SchoolVisitMultiStepFormModal({user, onSubmitSuccess}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isClinicalStep, setIsClinicalStep] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://rahilshabani.pythonanywhere.com/";
const questions = [
  {
    group: 'طراحي آموزشي مطابق با آموزش مبتني بر شايستگي با محوريت تلفيق شايستگی ها در فرآيند ياددهي – يادگيري',
    items: [
      { id: 'item1', label1: 'تدوین طرح درس سالانه (مطابق با استاندارد مهارت کاردانش و پودمان های فنی حرفه ای)', label2: 'عدم تدوین طرح درس سالانه (مطابق با استاندارد مهارت کاردانش و پودمان های فنی حرفه ای)' },
      { id: 'item2', label1: 'طرح درس روزانه شامل اهداف یادگیری روشن مبتنی بر کسب شایستگی ها (پایه، فنی و غیر فنی)', label2: 'نبود طرح درس روزانه شامل اهداف یادگیری روشن مبتنی بر کسب شایستگیها (پایه، فنی و غیر فنی)' },
      { id: 'item3', label1: 'توجه به یادگیریهای پیشین در انتخاب نقطه شروع آموزش', label2: 'عدم توجه به یادگیریهای پیشین در انتخاب نقطه شروع آموزش' },
      { id: 'item4', label1: 'انتخاب یک شروع مناسب و ایجاد برانگیختگی در یادگیری', label2: 'عدم انتخاب یک شروع مناسب و ایجاد برانگیختگی در یادگیری' },
      { id: 'item5', label1: 'ایجاد دلبستگی به فرهنگ غنی ایرانی – اسلامی در دانش آموزان/هنرجویان', label2: 'عدم ایجاد دلبستگی به فرهنگ غنی ایرانی – اسلامی در دانش آموزان/هنرجویان' },
      { id: 'item6', label1: 'زمینه سازی برای کاوشگری تفکر و حل مسئله در دانش آموزان/هنرجویان، حل مشکل، نیاز شغلی و ...', label2: 'عدم زمینه سازی برای کاوشگری تفکر و حل مسئله در دانش آموزان/هنرجویان، حل مشکل، نیاز شغلی و ...' },
      { id: 'item7', label1: 'تشویق مشارکت فعالانه هنرجو در فعالیتهای کاری', label2: 'عدم تشویق مشارکت فعالانه هنرجو در فعالیتهای کاری' },
      { id: 'item8', label1: 'توجه به تفاوتهای فردی دانش آموزان/هنرجویان در فرایند یاددهی – یادگیری', label2: 'عدم توجه به تفاوتهای فردی دانش آموزان/هنرجویان در فرایند یاددهی – یادگیری' },
      { id: 'item9', label1: 'پیش بینی فرصتهاى یادگیرى در تعامل هنرجویان با یکدیگر و ایفای نقش تسهیلگری هنرآموز', label2: 'عدم پیش بینی فرصتهاى یادگیرى در تعامل هنرجویان با یکدیگر و ایفای نقش تسهیلگری هنرآموز' },
      { id: 'item10', label1: 'استفاده از روشهای تدریس اثربخش(فعال و مسئله محور) متناسب با موضوع درس (شناخت مفاهیم نیاز، مسئله، مشکل، نوآوری و خلاقیت)', label2: 'عدم استفاده از روشهای تدریس اثربخش(فعال و مسئله محور) متناسب با موضوع درس (شناخت مفاهیم نیاز، مسئله، مشکل، نوآوری و خلاقیت)' },
      { id: 'item11', label1: 'انجام فعالیت مکمل خارج از کلاس/کارگاه هنرجویان جهت ارتقای شایستگی یادگیری مادام العمر وکسب اطلاعات حرفه ای، تعیین تکالیف تمرینی، توسعه ای و عملکردی برای هنرجویان', label2: 'انجام ندادن  فعالیت مکمل خارج از کلاس/کارگاه هنرجویان جهت ارتقای شایستگی یادگیری مادام العمر وکسب اطلاعات حرفه ای، تعیین تکالیف تمرینی، توسعه ای و عملکردی برای هنرجویان' }
    ]
  },
  {
    group: 'به کارگيري فناوري آموزشي و بهره گيري از دنياي کار',
    items: [
      { id: 'item12', label1: 'آشنایی با فناوریهای آموزشی و کاربست آن در تدریس (استفاده از شبیه سازها و مدلسازها)', label2: 'عدم آشنایی با فناوریهای آموزشی و کاربست آن در تدریس (استفاده از شبیه سازها و مدلسازها)' },
      { id: 'item13', label1: 'استفاده معلم/هنرآموز از وسایل کمک آموزشی و رسانه های متنوع آموزشی (محتوای الکترونیکی و ابزارهای در دسترس مانند شبکه مجازی شاد و ...)', label2: 'عدم استفاده معلم/هنرآموز از وسایل کمک آموزشی و رسانه های متنوع آموزشی (محتوای الکترونیکی و ابزارهای در دسترس مانند شبکه مجازی شاد و ...)' },
      { id: 'item14', label1: 'توانایی راهبری هنرجویان در کاربست مؤثر فناوری.', label2: 'عدم توانایی راهبری هنرجویان در کاربست مؤثر فناوری.' },
      { id: 'item15', label1: 'آگاهی و مهارت در به کارگیری شیوه های تدریس ترکیبی و تلفیقی (کلاس معکوس و ...)', label2: 'عدم آگاهی و مهارت در به کارگیری شیوه های تدریس ترکیبی و تلفیقی (کلاس معکوس و ...)' },
      { id: 'item16', label1: 'حضور و ارتباط با افراد مؤثر در دنیای کار متناسب با موضوع تدریس', label2: 'عدم حضور و ارتباط با افراد مؤثر در دنیای کار متناسب با موضوع تدریس' },
      { id: 'item17', label1: 'ایفای نقش هنرآموز و هنرجو در شغل (ایفای نقش شغلی)', label2: 'عدم ایفای نقش هنرآموز و هنرجو در شغل (ایفای نقش شغلی)' }
    ]
  },
  {
    group: 'تعامل و ارتباط با هنرجویان',
 

    items: [
      { id: 'item18', label1: 'آراستگی ظاهر و آرامش معلم/هنرآموز.', label2: 'عدم آراستگی ظاهر و آرامش معلم/هنرآموز.' },
      { id: 'item19', label1: 'فن بیان مناسب و ارائه شیوا و رسای مطالب.', label2: 'نداشتن فن بیان مناسب و ارائه شیوا و رسای مطالب.' },
      { id: 'item20', label1: 'پرهیز هنرآموز از بروز رفتارهای اضطراب آور و استرس در کلاس/کارگاه.', label2: 'بروز رفتارهای اضطراب آور و استرس در کلاس/کارگاه.' },
      { id: 'item21', label1: 'صمیمیت و ارتباط عاطفی معلم/هنرآموز با هنرجویان همراه با احترام متقابل (خوب گوش دادن، ارزش گذاری، خوب دیدن و ...)', label2: 'کمبود صمیمیت و ارتباط عاطفی معلم/هنرآموز با هنرجویان همراه با احترام متقابل (خوب گوش دادن، ارزش گذاری، خوب دیدن و ...)' },
      { id: 'item22', label1: 'صحبت محترمانه، گوش دادن فعال (همراه با توجه و تمرکز) و حفظ نوبت در صحبت.', label2: 'عدم صحبت محترمانه، گوش دادن فعال (همراه با توجه و تمرکز) و حفظ نوبت در صحبت.' },
      { id: 'item23', label1: 'شناخت دانش، مهارتها، علایق و استعدادهای ویژه هنرجویان و توجه به تفاوتهای فردی آنها.', label2: 'عدم شناخت دانش، مهارتها، علایق و استعدادهای ویژه هنرجویان و توجه به تفاوتهای فردی آنها.' },
      { id: 'item24', label1: 'شناسایی هنرجویان دارای علائم مرتبط با آسیبهای اجتماعی و رفتارهای پرخطر.', label2: 'عدم شناسایی هنرجویان دارای علائم مرتبط با آسیبهای اجتماعی و رفتارهای پرخطر.' },
      { id: 'item25', label1: 'شناسایی محرمانه وضعیت فرهنگی، اقتصادی و اجتماعی خانواده هنرجویان و شرایط اشتغال آنها.', label2: 'عدم شناسایی محرمانه وضعیت فرهنگی، اقتصادی و اجتماعی خانواده هنرجویان و شرایط اشتغال آنها.' },
      { id: 'item26', label1: 'برقراری اعتماد، اعتقاد و باور برای پذیرش معلم/هنرآموز.', label2: 'عدم  برقراری اعتماد، اعتقاد و باور برای پذیرش معلم/هنرآموز.' }
    ]
  },
  {
    group: 'جذب مشارکت فعالانه و مؤثر هنرجويان در فرآيند ياد دهي-يادگيري (بهره گيري از کار تيمي و هم انديشي هنرجويان و شبيه سازي شرايط محيط واقعي دنياي کار در کلاس درس /کارگاه)( ايفاي نقش شغلي)',

  items: [
    { id: 'item27', label1: 'پیشرفت فرایند آموزش و یادگیری هنرجویان مطابق با بودجه بندی سالانه و با آهنگ مناسب.', label2: 'عدم پیشرفت فرایند آموزش و یادگیری هنرجویان مطابق با بودجه بندی سالانه و با آهنگ مناسب.' },
    { id: 'item28', label1: 'ترغیب هنرجویان به پرسشگری و تفکر خلاق در فرآیند یاددهی- یادگیری.', label2: 'عدم ترغیب هنرجویان به پرسشگری و تفکر خلاق در فرآیند یاددهی- یادگیری.' },
    { id: 'item29', label1: 'تبدیل کلاس/کارگاه به تیمهای متوازن هنرجویان(3، 5 یا 7 نفری)', label2: 'عدم تبدیل کلاس/کارگاه به تیمهای متوازن هنرجویان(3، 5 یا 7 نفری)' },
    { id: 'item30', label1: 'انجام فعالیتهای یاددهی– یادگیری در قالب تیم و مبتنی بر کار تیمی با ایفای نقش شغلی.', label2: 'عدم انجام فعالیتهای یاددهی– یادگیری در قالب تیم و مبتنی بر کار تیمی با ایفای نقش شغلی.' },
    { id: 'item31', label1: 'توجه به ارتقای شایستگی های مرتبط به کار تیمی و مشارکتی هنرجویان (شایستگی های بین فردی، تفکر، تعالی فردی، ارتباط مؤثر، آموزش دیگران، مسئولیت پذیری، ایفای نقش در تیم، شرکت در اجتماعات و فعالیتها و ...) در فرآیند یاددهی- یادگیری.', label2: 'عدم توجه به ارتقای شایستگیهای مرتبط به کار تیمی و مشارکتی هنرجویان (شایستگیهای بین فردی، تفکر، تعالی فردی، ارتباط مؤثر، آموزش دیگران، مسئولیت پذیری، ایفای نقش در تیم، شرکت در اجتماعات و فعالیتها و ...) در فرآیند یاددهی- یادگیری.' },
    { id: 'item32', label1: 'ایفای نقش هنرجو در شغل برای یادگیری شایستگیها جهت کسب صلاحیت شغلی.', label2: 'عدم ایفای نقش هنرجو در شغل برای یادگیری شایستگیها جهت کسب صلاحیت شغلی.' },
    { id: 'item33', label1: 'استفاده بهینه از فضا و تجهیزات آموزشی، متناسب با تعداد هنرجویان و موضوع تدریس.', label2: 'عدم استفاده بهینه از فضا و تجهیزات آموزشی، متناسب با تعداد هنرجویان و موضوع تدریس.' }
  ]
},
{
  group: 'طراحي و اجراي صحيح انواع سنجش عملکردي و ارزشيابي مبتني بر شايستگي بر اساس اهداف شايستگي تدوين شده',
  items: [
    { id: 'item34', label1: 'اجرای معیارهای مورد انتظار در سنجش عملکرد همسو با اهداف شایستگی تدوین شده در طراحی آموزشی.', label2: 'عدم اجرای معیارهای مورد انتظار در سنجش عملکرد همسو با اهداف شایستگی تدوین شده در طراحی آموزشی.' },
    { id: 'item35', label1: 'طرح پرسش و پاسخ از سوی هنرآموز برای سنجش میزان فهم هنرجویان و حل مسائل آموزشی.', label2: 'عدم طرح پرسش و پاسخ از سوی هنرآموز برای سنجش میزان فهم هنرجویان و حل مسائل آموزشی.' },
    { id: 'item36', label1: 'نظارت مستمر بر یادگیری دانش آموزان/هنرجویان و ارائه بازخورد مناسب از یادگیری به هنرجویان.', label2: 'عدم نظارت مستمر بر یادگیری دانش آموزان/هنرجویان و ارائه بازخورد مناسب از یادگیری به هنرجویان.' },
    { id: 'item37', label1: 'ارزیابی هنرجو از کار خود (خودارزیابی) بر اساس معیارهای موردنظر هنرآموز.', label2: 'عدم ارزیابی هنرجو از کار خود (خودارزیابی) بر اساس معیارهای موردنظر هنرآموز.' },
    { id: 'item38', label1: 'ارزیابی هنرجو از کار هم تیمی ها (هم ارزیابی) بر اساس معیارهای موردنظر هنرآموز.', label2: 'عدم ارزیابی هنرجو از کار هم تیمی ها (هم ارزیابی) بر اساس معیارهای موردنظر هنرآموز.' },
    { id: 'item39', label1: 'ارزیابی هنرجو از کار تیمهای دیگر (دگر ارزیابی) بر اساس معیارهای موردنظر هنرآموز.', label2: 'عدم ارزیابی هنرجو از کار تیمهای دیگر (دگر ارزیابی) بر اساس معیارهای موردنظر هنرآموز.' },
    { id: 'item40', label1: 'فراهم آوردن فرصتهایی برای رفع نواقص یادگیری هنرجویان.', label2: 'عدم فراهم آوردن فرصتهایی برای رفع نواقص یادگیری هنرجویان.' },
    { id: 'item41', label1: 'استفاده از ابزارهای سنجش عملکردی و ارزشیابی مبتنی بر شایستگیها جهت سنجش و ارزشیابی اهداف تدوین شده مانند کاربرگ سنجش شایستگی (چک لیست، روبریک)، پوشه نمونه کار هنرجو،', label2: 'عدم استفاده از ابزارهای سنجش عملکردی و ارزشیابی مبتنی بر شایستگیها جهت سنجش و ارزشیابی اهداف تدوین شده مانند کاربرگ سنجش شایستگی (چک لیست، روبریک)، پوشه نمونه کار هنرجو،' },
    { id: 'item42', label1: 'مشاهده رفتار، واقعه نگاری.', label2: 'عدم مشاهده رفتار، واقعه نگاری.' },
  ]
},
{
     group: 'شايستگيهاي غير فني سه سطحي در فرآيند ياددهي- يادگيري براي ترکيب و تلفيق شايستگيها مستند سازی',
  
  items: [
    { id: 'item43', label1: 'انتخاب فناوری های مناسب', label2: 'عدم انتخاب فناوری های مناسب' },
    { id: 'item44', label1: 'امانتداری، مسئولیت پذیری، رعایت انصاف، درستکاری', label2: 'عدم امانتداری، مسئولیت پذیری، رعایت انصاف، درستکاری' },
    { id: 'item45', label1: 'رعایت ارگونومی در کارگاه', label2: 'عدم رعایت ارگونومی در کارگاه' },
    { id: 'item46', label1: 'زبان فنی', label2: 'نداشتن زبان فنی' },
    { id: 'item47', label1: 'استفاده از محافظ برق', label2: 'عدم استفاده از محافظ برق' },
    { id: 'item48', label1: 'کنترل محافظتی الکتریکی و الکترونیکی تجهیزات', label2: 'عدم کنترل محافظتی الکتریکی و الکترونیکی تجهیزات' },
    { id: 'item49', label1: 'مدیریت کیفیت', label2: 'عدم مدیریت کیفیت' },
    { id: 'item50', label1: 'رعایت اصول اخالقی و قانونی در استفاده از نرم افزارها', label2: 'عدم رعایت اصول اخالقی و قانونی در استفاده از نرم افزارها' },
    { id: 'item51', label1: 'تفکر خلاق', label2: 'نداشتن تفکر خلاق' },
  ]
},


{
  group: 'مستند سازی',
  items: [
    { id: 'item52', label1: 'بررسی و ثبت حضور دانش آموز/ هنرجو در کلاس/کارگاه و انجام تکالیف.', label2: 'عدم بررسی و ثبت حضور دانش آموز/هنرجو در کلاس/کارگاه و انجام تکالیف.' },
    { id: 'item53', label1: 'ثبت منظم ارزشیابی پیشرفت دانش آموزان/هنرجویان بر اساس هدفهای آموزشی (تکوینی و پایانی).', label2: 'عدم ثبت منظم ارزشیابی پیشرفت دانش آموزان/هنرجویان بر اساس هدفهای آموزشی (تکوینی و پایانی).' },
    { id: 'item54', label1: 'مستندات مربوط به سنجش عملکردی در شایستگیهای فنی و غیر فنی (ویژه هر پودمان/ استاندارد).', label2: 'نبود مستندات مربوط به سنجش عملکردی در شایستگیهای فنی و غیر فنی (ویژه هر پودمان/ استاندارد).' },
    { id: 'item55', label1: 'مشاهده فرایند یادگیری دانش آموزان/هنرجویان توسط معلم/هنرآموز و ثبت رفتار آنها در صورت نیاز.', label2: 'عدم مشاهده فرایند یادگیری دانش آموزان/هنرجویان توسط معلم/هنرآموز و ثبت رفتار آنها در صورت نیاز.' },
    { id: 'item56', label1: 'ثبت گزارش فعالیت روزانه فردی و تیمی توسط دانش آموز/هنرجو.', label2: 'عدم ثبت گزارش فعالیت روزانه فردی و تیمی توسط دانش آموز/هنرجو.' },
  ]
},

{
  group: 'شایستگی یادگیری و توسعه حرفه ای (ارتقای مهارت و دانش افزایی)',
  items: [
    { id: 'item57', label1: 'تسلط مهارتی و علمی معلم/هنرآموز بر محتوای آموزشی.', label2: 'عدم تسلط مهارتی و علمی معلم/هنرآموز بر محتوای آموزشی.' },
    { id: 'item58', label1: 'آشنایی و توانایی اجرا و ارزشیابی برنامه درسی مبتنی بر شایستگیها.', label2: 'عدم آشنایی و توانایی اجرا و ارزشیابی برنامه درسی مبتنی بر شایستگیها.' },
    { id: 'item59', label1: 'مشارکت فعال در کارگاههای دانش افزایی و گروههای آموزشی مدرسه، منطقه و استان.', label2: 'عدم مشارکت فعال در کارگاههای دانش افزایی و گروههای آموزشی مدرسه، منطقه و استان.' },
    { id: 'item60', label1: 'ارتباط مؤثر با سرگروههای آموزشی منطقه و استان از طریق گروههای تخصصی شبکه شاد.', label2: 'عدم ارتباط مؤثر با سرگروههای آموزشی منطقه و استان از طریق گروههای تخصصی شبکه شاد.' },
    { id: 'item61', label1: 'مشارکت در برنامه های توسعه حرفه ای معلمان شامل درس پژوهی، اقدام پژوهی، روایت پژوهی، آموزش به همکاران، نظارت همتا، تدریس مشترک، تدریس موازی، جشنواره الگوهای برتر تدریس، شرکت در مجامع حرفه ای تخصصی و همایش ها و سمینارهای مرتبط با رشته.', label2: 'عدم مشارکت در برنامه های توسعه حرفه ای معلمان شامل درس پژوهی، اقدام پژوهی، روایت پژوهی، آموزش به همکاران، نظارت همتا، تدریس مشترک، تدریس موازی، جشنواره الگوهای برتر تدریس، شرکت در مجامع حرفه ای تخصصی و همایش ها و سمینارهای مرتبط با رشته.' },
    { id: 'item62', label1: 'فعالیت مرتبط با رشته در عرصه دنیای کار بیرون.', label2: 'عدم فعالیت مرتبط با رشته در عرصه دنیای کار بیرون.' },
    { id: 'item63', label1: 'داشتن شرایط خلاقیت و نوآوری در کارهای مرتبط با رشته.', label2: 'عدم داشتن شرایط خلاقیت و نوآوری در کارهای مرتبط با رشته.' },
  ]
},
{
  group: 'سایر شایستگی های تخصصی با نظر سرگروه رشته',
  items: [
    { id: 'item64', label1: 'تسلط به شبکه های کامپیوتری (عیب یابی شبکه های محلی)', label2: 'عدم تسلط به شبکه های کامپیوتری (عیب یابی شبکه های محلی)' },
    { id: 'item65', label1: 'تسلط به سخت افزار رایانه (اسمبل کردن و عیب یابی سیستم)', label2: 'عدم تسلط به سخت افزار رایانه (اسمبل کردن و عیب یابی سیستم)' },
    { id: 'item66', label1: 'تسلط به نرم افزارهای رایانه ای (توانایی نصب و فعال سازی نرم افزارهای کاربردی)', label2: 'عدم تسلط به نرم افزارهای رایانه ای (توانایی نصب و فعال سازی نرم افزارهای کاربردی)' },
    { id: 'item67', label1: 'ساده‌سازی مفاهیم پیچیده درس (استفاده از اینفوگرافی، نقشه مفهومی، نقشه ذهنی و...)', label2: 'عدم ساده‌سازی مفاهیم پیچیده درس (استفاده از اینفوگرافی، نقشه مفهومی، نقشه ذهنی و...)' },
    { id: 'item68', label1: 'کنترل و آمادگی برای اتفاقات و رفتارهای پیش‌بینی نشده و یا مخرب در حین تدریس', label2: 'عدم کنترل و آمادگی برای اتفاقات و رفتارهای پیش‌بینی نشده و یا مخرب در حین تدریس' },
  ]
}
];


const getTodayJalaliDate = () => {
  const { jy, jm, jd } = toJalaali(new Date());
  return `${jy}/${jm}/${jd}`;
};


const initFormData= () => (
    {
  schoolCode: '',
  schoolInfo: {
    name: '',
    branch: 'fani',
    gb: 'girl',
    year: '1404-1405',
    visitDate: getTodayJalaliDate(),
    sch_type: 'dolati',
    phone: '',
  },
  artisans: [
    {
      role: '',
      lastName: '',
      firstName: '',
      degree: 'کارشناسی ارشد',
      major: '',
      personalCode: '',
      experience: '',
      hoursPerWeek: '',
      phone: '',
      courses: '',
      isTechnical: '',
    },
  ],
  staff: {
    manager: {
      firstName: '',
      lastName: '',
      personalCode: '',
      phone: '',
      degree: 'کارشناسی ارشد',
      field: '',
      isTechnical: 'بله',
    },
    assistant: {
      firstName: '',
      lastName: '',
      personalCode: '',
      phone: '',
      degree: 'کارشناسی ارشد',
      field: '',
      isTechnical: 'بله',
    },
    supervisor: {
      firstName: '',
      lastName: '',
      personalCode: '',
      phone: '',
      degree: 'کارشناسی ارشد',
      field: '',
      isTechnical: 'بله',
    },
  },
  classes: [],
  visitorInfo: {
  visitor_firstname: user.first_name,
  visitor_lastname: user.last_name,
  code: user.code,
  position: 'سرگروه',
  phone: user.phone,
},
  workshopAssessment: {
    // 1-17
    physicalSpace: 'متوسط',
    physicalSpaceDes: '',
    equipment: 'متوسط',
    equipmentDes: '',
    safety: 'متوسط',
    safetyDes: '',
    libraryliness: 'متوسط',
    librarylinessDes: '',
    softwareBank: 'متوسط',
    softwareBankDes: '',
    educationalActivities: 'متوسط',
    educationalActivitiesDes: '',
    poster: 'بله',
    posterDes: '',
    schedule: 'بله',
    scheduleDes: '',
    technicalTeaching: 'بله',
    technicalTeachingDes: '',
    grade12Equipment: 'متوسط',
    grade12EquipmentDes: '',
    grade10Hardware: 'متوسط',
    grade10HardwareDes: '',
    nonTechnicalTeaching: 'متوسط',
    nonTechnicalTeachingDes: '',
    studentsTeachingSatisfaction: 'متوسط',
    studentsTeachingSatisfactionDes: '',
    studentsEquipmentSatisfaction: 'متوسط',
    studentsEquipmentSatisfactionDes: '',
    studentsPlanningSatisfaction: 'متوسط',
    studentsPlanningSatisfactionDes: '',
    teachersEquipmentQualitySatisfaction: 'متوسط',
    teachersEquipmentQualitySatisfactionDes: '',
    teachersEquipmentQuantitySatisfaction: 'متوسط',
    teachersEquipmentQuantitySatisfactionDes: '',

    // 18-31
    workshopSize: 'مناسب است',
    workshopSizeDes: '',
    flooring: 'مناسب است',
    flooringDes: '',
    lighting: 'مناسب است',
    lightingDes: '',
    fireSuppression: 'مناسب است',
    fireSuppressionDes: '',
    coolingEquipment: 'مناسب است',
    coolingEquipmentDes: '',
    heatingEquipment: 'مناسب است',
    heatingEquipmentDes: '',
    heatingEquipment2: 'مناسب است',
    heatingEquipment2Des: '',
    fuse: 'مناسب است',
    fuseDes: '',
    projector: 'مناسب است',
    projectorDes: '',
    localNetwork: 'مناسب است',
    localNetworkDes: '',
    workshopNeatness: 'متوسط',
    workshopNeatnessDes: '',
    systemNumbering: 'بله',
    systemNumberingDes: '',
    systemSpecsLabeling: 'بله',
    systemSpecsLabelingDes: '',
    noticeBoardOrder: 'بله',
    noticeBoardOrderDes: '',
    cleanliness: 'بله',
    cleanlinessDes: '',
    dangerZoneMarking: 'بله',
    dangerZoneMarkingDes: '',
    safetyEquipmentUsage: 'بله',
    safetyEquipmentUsageDes: '',
    properCurtainsUsage: 'بله',
    properCurtainsUsageDes: '',
    properWorkAttire: 'بله',
    properWorkAttireDes: '',
  },
  clinicalSupervision: {
    designTitle: '',
    strengths: [],
    weaknesses: [],
  },
  assessmentItems: questions.reduce((acc, q) => {
    acc[q.id] = { choice: '', description: '' };
    return acc;
  }, {})
});
const [formData, setFormData] = useState(initFormData());

const handleAssessmentChange = (itemId, field, value) => {
  setFormData(prev => ({
    ...prev,
    assessmentItems: {
      ...prev.assessmentItems,
      [itemId]: {
        ...prev.assessmentItems[itemId],
        [field]: value
      }
    }
  }));
};


  function handleChange(path, value) {
  setFormData(prevData => {
    const newData = { ...prevData };
    let temp = newData;
    for (let i = 0; i < path.length - 1; i++) {
      // اگر مسیر میره داخل آرایه یا آبجکت
      const key = path[i];
      if (temp[key] === undefined) {
        // اگر موجود نیست، مقداردهی اولیه کن (آرایه یا آبجکت بسته به کلید بعدی)
        temp[key] = typeof path[i + 1] === 'number' ? [] : {};
      }
      temp = temp[key];
    }
    // مقدار آخر را ست کن
    temp[path[path.length - 1]] = value;
    return newData;
  });
}

// const handleChange = (path, value) => {
//   setFormData(prev => {
//     const newData = { ...prev };
//     let target = newData;
//     for (let i = 0; i < path.length - 1; i++) {
//       // اگر مسیر ایندکس عددی بود، آرایه است
//       if (typeof path[i] === 'number') {
//         target = target[path[i]];
//       } else {
//         // برای کلیدهای آبجکت
//         if (!target[path[i]]) target[path[i]] = {};
//         target = target[path[i]];
//       }
//     }
//     target[path[path.length - 1]] = value;
//     return newData;
//   });
// };

  // const handleChange = (path, value) => {
  //   setFormData(prev => {
  //     const newData = { ...prev };
  //     let target = newData;
  //     for (let i = 0; i < path.length - 1; i++) {
  //       target = target[path[i]];
  //     }
  //     target[path[path.length - 1]] = value;
  //     return newData;
  //   });
  // };

  const handleClassChange = (index, path, value) => {
    setFormData(prev => {
      const updatedClasses = [...prev.classes];
      let target = updatedClasses[index];
      for (let i = 0; i < path.length - 1; i++) {
        if (!target[path[i]]) target[path[i]] = {};
        target = target[path[i]];
      }
      target[path[path.length - 1]] = value;
      return { ...prev, classes: updatedClasses };
    });
  };

  const addClassInfo = () => {
    setFormData(prev => ({
      ...prev,
      classes: [
        ...prev.classes,
        {
          major: '',
          grade10Classes: '0',
          grade10Students: '0',
          grade11Classes: '0',
          grade11Students: '0',
          grade12Classes: '0',
          grade12Students: '0',
          activeWorkshops: '0',
          totalDevices: '0'
        }
      ]
    }));
  };

  const removeClassInfo = (index) => {
    setFormData(prev => {
      const updated = [...prev.classes];
      updated.splice(index, 1);
      return { ...prev, classes: updated };
    });
  };

  const handleNextClick = async () => {
    setError(null);
    if (step === 1) {
      const ok = await checkSchoolCode();
      if (ok) handleNext();
    } else {
      handleNext();
    }
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    
    axios.post(`${backendUrl}/programs/school-visits/`, {
  ...formData,
  county: user.county,
  area: user.area,
  user: user,
})

      .then(() => {
        setSuccess(true);
        setLoading(false);
        if (onSubmitSuccess) onSubmitSuccess();
      })
      .catch(() => {
        setError('مشکلی رخ داد');
        setLoading(false);
      });
  };

  const closeModal = () => {
    setModalOpen(false);
    setStep(1);
    setSuccess(false);
    setError(null);
    setLoading(false);
    setIsClinicalStep(false);
    setFormData(initFormData());
  };

  const checkSchoolCode = async () => {
    const code = formData.schoolCode;
    if (!code) {
      setError('کد مدرسه وارد نشده است');
      return false;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${backendUrl}/users/schools/${code}`, {
      });
      const schoolInfo = response.data;
      console.log("schoolInfo",schoolInfo)
      setFormData(prev => ({
        ...prev,
        schoolInfo: {
          ...prev.schoolInfo,
          ...schoolInfo
        }
      }));
      setLoading(false);
      return true;
    } catch (err) {
      console.error("خطا در درخواست:", err);
      if (code.length<8){
      setError("کد باید 8 رقمی باشد");
      setLoading(false);
return false;
      }
      else{
      setLoading(false);
      return true;

      }
    }
  };

  const handleAddArtisan = () => {
  const newArtisan = {
    role: "",
    firstName: "",
    lastName: "",
    degree: "",
    field: "",
    personalCode: "",
    experience: "",
    hoursPerWeek: "",
    phone: "",
    courses: "",
    isTechnical: false
  };

  setFormData(prev => ({
    ...prev,
    artisans: [...(prev.artisans || []), newArtisan]
  }));
};

const handleRemoveArtisan = (index) => {
  setFormData(prev => ({
    ...prev,
    artisans: prev.artisans.filter((_, i) => i !== index)
  }));
};


  const renderStep = () => {
  if (step >= 16 && step < 16 + questions.length) {
  const questionIndex = step - 16;
  const q = questions[questionIndex];

  return (
    <>
  <p className="text-center text-lg font-semibold bg-gray-100 p-3 rounded mb-4 border border-gray-300 shadow">
  {q.group}
</p>

      {q.items.map(item => (
        <AssessmentItem
          key={item.id}
          id={item.id}
          // group={q.group}
          label1={item.label1}
          label2={item.label2}
          value={formData.assessmentItems[item.id]?.choice}
          description={formData.assessmentItems[item.id]?.description}
          onChange={handleAssessmentChange}
        />
      ))}
    </>
  );
}

    switch (step) {
      case 1: return <Step1SchoolCode data={formData} onChange={handleChange} />;
      case 2: return <Step2SchoolInfo data={formData} onChange={handleChange} />;
      case 3: return <Step3StaffInfo data={formData} onChange={handleChange} />;
      case 4:
      if (formData.classes.length === 0) {
        addClassInfo();
      }
      return (
        <Step4ClassesInfo
          data={formData}
          onChange={handleClassChange}
          onAdd={addClassInfo}
          onRemove={removeClassInfo}
        />
      );
      // case 5: return <Step31TeacherInfo data={formData} onChange={handleChange} />;
      case 5:
        return (
          <Step31TeacherInfo
            data={formData}
            onChange={handleChange}
            onAdd={handleAddArtisan}
            onRemove={handleRemoveArtisan}
          />
        );
      case 6: return <Step5VisitorInfo data={formData} onChange={handleChange} />;
      case 7: return <Step6WorkshopAssessment data={formData} onChange={handleChange} />;
      case 8: return <Step61WorkshopAssessment data={formData} onChange={handleChange} />;
      case 9: return <Step62WorkshopAssessment data={formData} onChange={handleChange} />;
      case 10: return <Step63WorkshopAssessment data={formData} onChange={handleChange} />;
      
      case 11: return <Step64WorkshopAssessment data={formData} onChange={handleChange} />;
      case 12: return <Step65WorkshopAssessment data={formData} onChange={handleChange} />;
      case 13: return <Step66WorkshopAssessment data={formData} onChange={handleChange} />;
      case 14: return <Step67WorkshopAssessment data={formData} onChange={handleChange} />;
      case 15: return <Step68WorkshopAssessment data={formData} onChange={handleChange} />;
      default: return <div>مرحله نامعتبر</div>;
    }
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded">ثبت بازدید</button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative overflow-y-auto max-h-screen">
            <button onClick={closeModal} className="absolute top-2 right-2 text-2xl">&times;</button>
            <h2 className="text-xl font-bold text-center mb-4">فرم ثبت بازدید هنرستان</h2>

            {error && <div className="text-red-500 mb-2">{error}</div>}
            {success && <div className="text-green-600 mb-2">✔️ ثبت شد!</div>}

            {!success && (
              <>
                {!isClinicalStep ? (
                  <>
                    {renderStep()}
                    <div className="flex justify-between mt-4">
                      {/* {alert(step)} */}
                      {step > 1 && <button onClick={handleBack} className="px-4 py-2 bg-gray-400 text-white rounded">بازگشت</button>}
                      {(step == 15 || step == 24) && <button onClick={handleSubmit} className="px-4 py-2 bg-green-400 text-white rounded">ثبت بازدید و اتمام</button>}
                     {step == 15 && <button onClick={handleNextClick} className="px-4 py-2 bg-blue-500 text-white rounded">ثبت نظارت بالینی</button>}
                      {step < 24 && step !=15 && <button onClick={handleNextClick} className="px-4 py-2 bg-blue-500 text-white rounded">ادامه</button>}
                    </div>
                  </>
                ) : (
                  <Step8ClinicalSupervisionForm
                    data={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}



