import { Suspense } from "react";
import { getProducts } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";

async function ProductGrid() {
  const products = await getProducts();

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-3">
          تعداد کل: {products.length.toLocaleString("fa-IR")} محصول
        </span>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <section className="py-2">
      <div className="mb-4 pb-3 border-bottom">
        <h1 className="h3 fw-bold text-dark mb-1">
          تجهیزات حرفه‌ای برنامه‌نویسی
        </h1>
        <p className="text-secondary mb-0 small">
          گزیده‌ای از بهترین سخت‌افزارها برای افزایش بهره‌وری و ارگونومی محیط کار
        </p>
      </div>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid />
      </Suspense>
    </section>
  );
}