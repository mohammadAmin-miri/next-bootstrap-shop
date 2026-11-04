import { Suspense } from "react";
import { getProducts } from "@/services/productService";
import ProductCatalog from "@/components/product/ProductCatalog";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";

async function ProductSection() {
  const products = await getProducts();
  return <ProductCatalog initialProducts={products} />;
}

export default function HomePage() {
  return (
    <section className="py-2">
      <div className="mb-4 pb-3 border-bottom">
        <h1 className="h3 fw-bold text-dark mb-1">
          Professional Developer Equipment
        </h1>
        <p className="text-secondary mb-0 small">
          A curated selection of top hardware to improve productivity and workplace ergonomics
        </p>
      </div>

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductSection />
      </Suspense>
    </section>
  );
}