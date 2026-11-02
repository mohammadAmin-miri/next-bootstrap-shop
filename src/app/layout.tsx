import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapClient from "@/components/ui/BootstrapClient";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "دیجی‌استور | فروشگاه تخصصی تجهیزات برنامه‌نویسی",
  description: "نمونه کار فروشگاه اینترنتی توسعه‌یافته با Next.js، TypeScript و Bootstrap 5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-light d-flex flex-column min-vh-100">
        <main className="container py-4 flex-grow-1">
          {children}
        </main>
        <BootstrapClient />
      </body>
    </html>
  );
}