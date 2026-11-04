🌐 **زبان پروژه:** **نسخه فارسی (شاخه فعلی)** | [🇬🇧 English Version (Main Branch)](https://github.com/mohammadAmin-miri/next-bootstrap-shop/tree/main)

# 🛒 دیجی‌استور | فروشگاه اینترنتی تجهیزات برنامه‌نویسی

> یک نمونه‌کار حرفه‌ای فروشگاهی توسعه‌یافته با **Next.js (App Router)**، **TypeScript** و **Bootstrap 5 (RTL)**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.3%20(RTL)-purple?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)
[![JSON Server](https://img.shields.io/badge/Mock_API-JSON_Server-orange?style=flat-square)](https://github.com/typicode/json-server)

## ✨ ویژگی‌های کلیدی (Key Features)

* **معماری مدرن Next.js:** استفاده از **Server Components** برای واکشی بهینه داده‌ها و متادیتای سئو، همراه با **Client Components** برای بخش‌های تعاملی کاتالوگ و مدیریت سبد خرید.
* **فیلتر و جستجوی همگام با URL:**
  * **جستجوی هوشمند (Debounce):** تأخیر ۵۰۰ میلی‌ثانیه‌ای در تایپ برای جلوگیری از رندرهای اضافی.
  * **فیلتر دسته‌بندی و مرتب‌سازی:** قابلیت فیلتر بر اساس دسته‌بندی سخت‌افزارها و مرتب‌سازی بر اساس قیمت یا امتیاز کاربران.
  * **هماهنگی با URL Search Params:** تمام فیلترها، متن جستجو، ترتیب مرتب‌سازی و شماره صفحه در URL ذخیره می‌شوند (`?category=...&sort=...&page=...`) تا لینک‌ها قابل اشتراک‌گذاری باشند.
* **سبد خرید پایدار (`CartContext`):**
  * ذخیره‌سازی خودکار اطلاعات سبد خرید در `localStorage`.
  * اعتبارسنجی لحظه‌ای موجودی انبار برای جلوگیری از سفارش بیش از حد.
  * محاسبه آنی فاکتور و شبیه‌سازی مراحل پرداخت.
* **طراحی ریسپانسیو و تجربه کاربری (UI/UX):**
  * پیاده‌سازی کامل با **Bootstrap 5 RTL** و فونت Vazirmatn.
  * لودینگ جریانی (Streaming) با `<Suspense>` و اسکلتون‌های اختصاصی (Skeleton Loaders).
  * صفحات مدیریت خطای ۴۰۴ و برچسب‌های وضعیت انبار.

## 🛠️ تکنولوژی‌های پروژه (Tech Stack)

* **فریم‌ورک:** Next.js (App Router, Turbopack)
* **زبان برنامه‌نویسی:** TypeScript
* **استایل‌دهی:** Bootstrap 5 RTL, Bootstrap Icons, Custom CSS
* **مدیریت استیت:** React Context API + LocalStorage
* **بک‌اند تستی (Mock API):** JSON Server (با ۱۸ محصول تخصصی برنامه‌نویسی)

## 🚀 راهنمای نصب و راه‌اندازی (Getting Started)

برای اجرای پروژه روی سیستم خود، مراحل زیر را دنبال کنید:

1. **کلون کردن مخزن:**
   ```bash
   git clone [https://github.com/mohammadAmin-miri/next-bootstrap-shop.git](https://github.com/mohammadAmin-miri/next-bootstrap-shop.git)
   cd next-bootstrap-shop

   ## 📦 دستورات اجرایی NPM (NPM Scripts)
   npm run dev:all
    



