import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById } from "@/services/productService";
import AddToCartButton from "@/components/product/AddToCartButton";
interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return { title: "Product Not Found | DigiStore" };
  }

  return {
    title: `${product.title} | DigiStore`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const isLowStock = product.stock > 0 && product.stock <= 3;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="py-2">
      {/* Breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item text-secondary">{product.category}</li>
          <li
            className="breadcrumb-item active text-dark fw-medium"
            aria-current="page"
          >
            {product.title}
          </li>
        </ol>
      </nav>

      {/* Main product details */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="row g-0">
          {/* Product image */}
          <div className="col-lg-5 bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center p-4">
            <div
              className="position-relative w-100 rounded-4 overflow-hidden shadow-sm"
              style={{ height: "380px" }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-fit-cover"
              />
            </div>
          </div>

          {/* Product information and purchase */}
          <div className="col-lg-7 p-4 p-lg-5 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-medium">
                Category: {product.category}
              </span>

              <div className="d-flex align-items-center gap-1 bg-warning bg-opacity-10 px-3 py-1 rounded-pill">
                <span className="fw-bold text-dark small">
                  {product.rating.toLocaleString("en-US")}
                </span>
                <i className="bi bi-star-fill text-warning small"></i>
              </div>
            </div>

            <h1 className="h3 fw-bold text-dark mb-3">{product.title}</h1>

            <p className="text-secondary lh-lg mb-4">{product.description}</p>

            {/* Purchase benefits */}
            <div className="row row-cols-1 row-cols-sm-2 g-3 mb-4 py-3 border-top border-bottom">
              <div className="col d-flex align-items-center gap-2 text-secondary small">
                <i className="bi bi-shield-check text-success fs-5"></i>
                <span>18-month manufacturer warranty</span>
              </div>
              <div className="col d-flex align-items-center gap-2 text-secondary small">
                <i className="bi bi-truck text-primary fs-5"></i>
                <span>Fast shipping from our Tehran warehouse</span>
              </div>
            </div>

            {/* Availability, price, and add-to-cart button */}
            <div className="mt-auto pt-2 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
              <div>
                <div className="mb-1">
                  {isOutOfStock ? (
                    <span className="badge bg-danger">Out of stock</span>
                  ) : isLowStock ? (
                    <span className="text-danger small fw-bold">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      Only {product.stock.toLocaleString("en-US")} left in stock
                    </span>
                  ) : (
                    <span className="text-success small fw-medium">
                      <i className="bi bi-check2-circle me-1"></i>
                      In stock ({product.stock.toLocaleString("en-US")} available)
                    </span>
                  )}
                </div>

                <div>
                  <span className="fs-3 fw-bold text-dark">
                    {product.price.toLocaleString("en-US")}
                  </span>
                  <span className="text-secondary ms-1">Toman</span>
                </div>
              </div>

              {/* Purchase button connected to CartContext */}
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}