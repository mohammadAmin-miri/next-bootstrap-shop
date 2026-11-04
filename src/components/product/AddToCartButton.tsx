"use client";

import Link from "next/link";
import { Product } from "../../../types";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, decreaseQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  const isOutOfStock = product.stock === 0;
  const isMaxStockReached = quantity >= product.stock;

  if (isOutOfStock) {
    return (
      <button
        type="button"
        disabled
        className="btn btn-secondary btn-lg rounded-3 px-4 py-3"
      >
        Out of stock
      </button>
    );
  }

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => addToCart(product)}
        className="btn btn-primary btn-lg rounded-3 px-4 py-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
      >
        <i className="bi bi-cart-plus fs-5"></i>
        <span>Add to Cart</span>
      </button>
    );
  }

  return (
    <div className="d-flex flex-column align-items-sm-end gap-2">
      <div className="d-flex align-items-center gap-3">
        {/* Quantity controls */}
        <div className="d-flex align-items-center border rounded-3 p-1 bg-light">
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={isMaxStockReached}
            className="btn btn-sm btn-white border-0 px-3 py-2 fw-bold text-primary"
            title="Increase quantity"
          >
            <i className="bi bi-plus-lg"></i>
          </button>

          <span className="px-3 fw-bold fs-5 text-dark">
            {quantity.toLocaleString("en-US")}
          </span>

          <button
            type="button"
            onClick={() => decreaseQuantity(product.id)}
            className="btn btn-sm btn-white border-0 px-3 py-2 text-danger"
            title={quantity === 1 ? "Remove from cart" : "Decrease quantity"}
          >
            <i className={`bi ${quantity === 1 ? "bi-trash3" : "bi-dash-lg"}`}></i>
          </button>
        </div>

        {/* Quick link to the cart */}
        <Link
          href="/cart"
          className="btn btn-outline-success rounded-3 px-3 py-2 d-flex align-items-center gap-2 small fw-medium"
        >
          <span>View Cart</span>
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      {isMaxStockReached && (
        <span className="text-danger" style={{ fontSize: "0.75rem" }}>
          Maximum available stock selected
        </span>
      )}
    </div>
  );
}