import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock <= 3;

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card">
      <Link
        href={`/products/${product.id}`}
        className="position-relative bg-secondary bg-opacity-10 d-block"
        style={{ height: "220px" }}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-fit-cover"
        />
        <span className="position-absolute top-0 start-0 m-3 badge bg-white text-dark shadow-sm px-3 py-2 rounded-pill fw-medium">
          {product.category}
        </span>
      </Link>

      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-center mb-2 small">
          <span
            className={`fw-medium ${
              isLowStock ? "text-danger" : "text-success"
            }`}
          >
            {isLowStock
              ? `تنها ${product.stock.toLocaleString("fa-IR")} عدد در انبار`
              : "موجود در انبار"}
          </span>

          <div className="d-flex align-items-center gap-1 text-warning fw-bold">
            <span className="text-dark">
              {product.rating.toLocaleString("fa-IR")}
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
            <span className="fs-5 fw-bold text-dark">
              {product.price.toLocaleString("fa-IR")}
            </span>
            <span className="text-secondary small ms-1">تومان</span>
          </div>

          <Link
            href={`/products/${product.id}`}
            className="btn btn-outline-primary btn-sm rounded-3 px-3 py-2 d-flex align-items-center gap-1 fw-medium"
          >
            <span>مشاهده</span>
            <i className="bi bi-arrow-left"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}