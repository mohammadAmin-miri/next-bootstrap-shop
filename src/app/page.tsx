import { getProducts } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <section className="py-2">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h1 className="h3 fw-bold text-dark mb-1">
            تجهیزات حرفه‌ای برنامه‌نویسی
          </h1>
          <p className="text-secondary mb-0 small">
            گزیده‌ای از بهترین سخت‌افزارها برای افزایش بهره‌وری و ارگونومی محیط کار
          </p>
        </div>
        <div className="mt-3 mt-md-0">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-3">
            تعداد کل: {products.length.toLocaleString("fa-IR")} محصول
          </span>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}