import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import BootstrapClient from "@/components/ui/BootstrapClient";
import Navbar from "@/components/ui/Navbar";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "DigiStore | Developer Equipment Store",
  description: "An online store built with Next.js, TypeScript, and Bootstrap 5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-light d-flex flex-column min-vh-100">
        <CartProvider>
          <Navbar />
          <main className="container py-4 flex-grow-1">
            {children}
          </main>
        </CartProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}