"use client";

import { useCart } from "@/context/CartContext";

interface CartSummaryProps {
  onCheckout: () => void;
}

export default function CartSummary({ onCheckout }: CartSummaryProps) {
  const { totalItems, totalPrice } = useCart();

  return (
    <div
      className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top"
      style={{ top: "90px", zIndex: 10 }}
    >
      <h2 className="h5 fw-bold text-dark mb-4 pb-3 border-bottom">
        خلاصه سفارش
      </h2>

      <div className="d-flex justify-content-between align-items-center mb-3 text-secondary">
        <span>تعداد کل کالاها</span>
        <span className="fw-bold text-dark">
          {totalItems.toLocaleString("fa-IR")} عدد
        </span>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 text-secondary">
        <span>هزینه ارسال</span>
        <span className="badge bg-success bg-opacity-10 text-success px-2 py-1 rounded-2">
          رایگان
        </span>
      </div>

      <div className="border-top pt-3 mt-2 mb-4 d-flex justify-content-between align-items-center">
        <span className="fw-bold text-dark">مبلغ قابل پرداخت</span>
        <div>
          <span className="fs-4 fw-bold text-primary">
            {totalPrice.toLocaleString("fa-IR")}
          </span>
          <span className="text-secondary small ms-1">تومان</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="btn btn-primary btn-lg w-100 rounded-3 py-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
      >
        <i className="bi bi-credit-card fs-5"></i>
        <span>تکمیل خرید و پرداخت</span>
      </button>

      <div className="mt-3 pt-2 text-center">
        <small className="text-secondary d-flex align-items-center justify-content-center gap-1">
          <i className="bi bi-shield-lock text-success"></i>
          <span>پرداخت امن از طریق درگاه بانکی شاپرک</span>
        </small>
      </div>
    </div>
  );
}