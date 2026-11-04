"use client";

import Image from "next/image";
import Link from "next/link";
import { CartItem } from "../../../types";
import { useCart } from "@/context/CartContext";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { addToCart, decreaseQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const itemTotalPrice = product.price * quantity;
  const isMaxStockReached = quantity >= product.stock;

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-3 overflow-hidden bg-white">
      <div className="card-body p-3 p-sm-4">
        <div className="row align-items-center g-3">
          {/* Product image */}
          <div className="col-4 col-sm-3 col-md-2">
            <Link
              href={`/products/${product.id}`}
              className="position-relative d-block rounded-3 overflow-hidden bg-secondary bg-opacity-10"
              style={{ height: "90px" }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-fit-cover"
              />
            </Link>
          </div>

          {/* Title and unit price */}
          <div className="col-8 col-sm-9 col-md-4">
            <span className="badge bg-secondary bg-opacity-10 text-secondary mb-1 fw-normal">
              {product.category}
            </span>
            <Link
              href={`/products/${product.id}`}
              className="d-block fw-bold text-dark text-decoration-none mb-1 line-clamp-2"
            >
              {product.title}
            </Link>
            <div className="text-secondary small">
              <span>Unit price: </span>
              <span className="fw-medium text-dark">
                {product.price.toLocaleString("en-US")} Toman
              </span>
            </div>
          </div>

          {/* Quantity controls */}
          <div className="col-6 col-md-3 d-flex flex-column align-items-start align-items-md-center mt-3 mt-md-0">
            <div className="d-flex align-items-center border rounded-3 p-1 bg-light">
              <button
                type="button"
                onClick={() => addToCart(product)}
                disabled={isMaxStockReached}
                className="btn btn-sm border-0 px-2 py-1 text-primary"
                title="Increase quantity"
              >
                <i className="bi bi-plus-lg"></i>
              </button>

              <span className="px-3 fw-bold text-dark">
                {quantity.toLocaleString("en-US")}
              </span>

              <button
                type="button"
                onClick={() => decreaseQuantity(product.id)}
                className="btn btn-sm border-0 px-2 py-1 text-danger"
                title="Decrease quantity"
              >
                <i className="bi bi-dash-lg"></i>
              </button>
            </div>

            {isMaxStockReached && (
              <span
                className="text-danger mt-1"
                style={{ fontSize: "0.7rem" }}
              >
                Maximum stock reached ({product.stock.toLocaleString("en-US")} available)
              </span>
            )}
          </div>

          {/* Row total and remove button */}
          <div className="col-6 col-md-3 d-flex align-items-center justify-content-end gap-3 mt-3 mt-md-0">
            <div className="text-end">
              <div className="small text-secondary">Subtotal:</div>
              <div className="fw-bold text-dark">
                {itemTotalPrice.toLocaleString("en-US")}
                <span className="small fw-normal text-secondary ms-1">Toman</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeFromCart(product.id)}
              className="btn btn-outline-danger btn-sm rounded-3 p-2 border-0 bg-danger bg-opacity-10"
              title="Remove product from cart"
            >
              <i className="bi bi-trash3 fs-5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}