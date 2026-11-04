import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card bg-white">
      <Link
        href={`/products/${product.id}`}
        className="position-relative bg-secondary bg-opacity-10 d-block"
        style={{ height: "220px" }}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-fit-cover ${isOutOfStock ? "opacity-50" : ""}`}
        />
        <span className="position-absolute top-0 start-0 m-3 badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill fw-medium">
          {product.category}
        </span>

        {isOutOfStock && (
          <span className="position-absolute top-0 end-0 m-3 badge bg-danger shadow-sm px-3 py-2 rounded-pill fw-medium">
            Out of stock
          </span>
        )}
      </Link>

      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-center mb-2 small">
          <span
            className={`fw-medium ${
              isOutOfStock
                ? "text-muted"
                : isLowStock
                ? "text-danger"
                : "text-success"
            }`}
          >
            {isOutOfStock
              ? "Out of stock"
              : isLowStock
              ? `Only ${product.stock.toLocaleString("en-US")} left in stock`
              : "In stock"}
          </span>

          <div className="d-flex align-items-center gap-1 text-warning fw-bold">
            <span className="text-dark">
              {product.rating.toLocaleString("en-US")}
            </span>
            <i className="bi bi-star-fill"></i>
          </div>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="card-title h6 fw-bold text-dark text-decoration-none mb-3 line-clamp-2"
          style={{ minHeight: "2.5rem" }}
        >
          {product.title}
        </Link>

        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
          <div>
            <span
              className={`fs-5 fw-bold ${
                isOutOfStock
                  ? "text-secondary text-decoration-line-through"
                  : "text-dark"
              }`}
            >
              {product.price.toLocaleString("en-US")}
            </span>
            <span className="text-secondary small ms-1">Toman</span>
          </div>

          <Link
            href={`/products/${product.id}`}
            className={`btn ${
              isOutOfStock ? "btn-outline-secondary" : "btn-outline-primary"
            } btn-sm rounded-3 px-3 py-2 d-flex align-items-center gap-1 fw-medium`}
          >
            <span>View</span>
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}