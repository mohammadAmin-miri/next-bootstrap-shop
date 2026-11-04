"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
    const { items, clearCart, totalItems } = useCart();
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);

    const handleCheckout = () => {
        clearCart();
        setIsOrderSuccess(true);
    };

    // 1. Order success state (shown after the order is placed and the cart is empty)
    if (isOrderSuccess && items.length === 0) {
        return (
            <div className="card border-0 shadow-sm rounded-4 p-5 text-center my-5 bg-white">
                <div className="py-4">
                    <div
                        className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                        style={{ width: "80px", height: "80px" }}
                    >
                        <i className="bi bi-check-lg display-4"></i>
                    </div>
                    <h1 className="h3 fw-bold text-dark mb-2">
                        Your order has been placed successfully!
                    </h1>
                    <p className="text-secondary mb-4">
                        Thank you for your purchase. Your order tracking number will be sent to you by text message.
                    </p>
                    <Link
                        href="/"
                        onClick={() => setIsOrderSuccess(false)}
                        className="btn btn-primary rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2"
                    >
                        <span>Back to store</span>
                        <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
            </div>
        );
    }

    // 2. Empty cart state
    if (items.length === 0) {
        return (
            <div className="card border-0 shadow-sm rounded-4 p-5 text-center my-5 bg-white">
                <div className="py-4">
                    <i className="bi bi-cart-x text-secondary display-1 mb-3 d-block"></i>
                    <h1 className="h4 fw-bold text-dark mb-2">Your cart is empty!</h1>
                    <p className="text-secondary mb-4">
                        Visit the store homepage to browse more products.
                    </p>
                    <Link
                        href="/"
                        className="btn btn-primary rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2"
                    >
                        <i className="bi bi-bag-plus"></i>
                        <span>Browse products</span>
                    </Link>
                </div>
            </div>
        );
    }

    // 3. Cart items and order summary
    return (
        <div className="py-2">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 pb-3 border-bottom gap-2">
                <div>
                    <h1 className="h3 fw-bold text-dark mb-1">Your Shopping Cart</h1>
                    <p className="text-secondary small mb-0">
                        {totalItems.toLocaleString("en-US")} items in your cart
                    </p>
                </div>

                <button
                    type="button"
                    onClick={clearCart}
                    className="btn btn-outline-danger btn-sm rounded-3 px-3 py-2 d-inline-flex align-items-center gap-2 align-self-start align-self-sm-center"
                >
                    <i className="bi bi-trash"></i>
                    <span>Clear cart</span>
                </button>
            </div>

            <div className="row g-4">
                <div className="col-lg-8">
                    {items.map((item) => (
                        <CartItemRow key={item.product.id} item={item} />
                    ))}
                </div>

                <div className="col-lg-4">
                    <CartSummary onCheckout={handleCheckout} />
                </div>
            </div>
        </div>
    );
}