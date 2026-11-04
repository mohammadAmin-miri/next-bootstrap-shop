import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="card border-0 shadow-sm rounded-4 p-5 text-center my-5 bg-white">
      <div className="py-4">
        <i className="bi bi-box-seam text-secondary display-1 mb-3 d-block"></i>
        <h2 className="h4 fw-bold text-dark mb-2">Product not found!</h2>
        <p className="text-secondary mb-4">
          Unfortunately, this product is unavailable or has been removed from the store.
        </p>
        <Link
          href="/"
          className="btn btn-primary rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2"
        >
          <i className="bi bi-arrow-left"></i>
          <span>Back to products</span>
        </Link>
      </div>
    </div>
  );
}