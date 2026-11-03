"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className="sticky-top bg-white border-bottom shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light container py-2">
        <div className="container-fluid px-0">
          <Link
            href="/"
            className="navbar-brand d-flex align-items-center gap-2 fw-bold text-dark m-0"
          >
            <i className="bi bi-code-slash text-primary fs-3"></i>
            <span>دیجی‌استور</span>
          </Link>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="تغییر وضعیت منو"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 pr-lg-3">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link px-3 ${
                    pathname === "/" ? "active fw-bold text-primary" : "text-secondary"
                  }`}
                >
                  محصولات
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center mt-2 mt-lg-0">
              <Link
                href="/cart"
                className={`btn ${
                  pathname === "/cart" ? "btn-primary" : "btn-outline-primary"
                } d-flex align-items-center gap-2 rounded-3 px-3 py-2`}
              >
                <i className="bi bi-bag fs-5"></i>
                <span>سبد خرید</span>
                <span className="badge rounded-pill bg-danger">
                  {totalItems.toLocaleString("fa-IR")}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}