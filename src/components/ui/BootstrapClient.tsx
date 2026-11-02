"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // @ts-expect-error: باندل جاوااسکریپت بوت‌استرپ فایل تایپ پیش‌فرض ندارد
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}