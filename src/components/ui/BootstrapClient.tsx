"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // @ts-expect-error Bootstrap's JavaScript bundle does not provide default type declarations.
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}