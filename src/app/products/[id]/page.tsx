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
    return { title: "محصول یافت نشد | دیجی‌استور" };
  }

  return {
    title: `${product.title} | دیجی‌استور`,
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
      {/* مسیر راهنما (Breadcrumb) */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item">
            <Link href="/" className="text-decoration-none text-secondary">
              صفحه اصلی
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

      {/* باکس اصلی جزئیات محصول */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="row g-0">
          {/* بخش تصویر محصول */}
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

          {/* بخش اطلاعات و خرید */}
          <div className="col-lg-7 p-4 p-lg-5 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-medium">
                دسته‌بندی: {product.category}
              </span>

              <div className="d-flex align-items-center gap-1 bg-warning bg-opacity-10 px-3 py-1 rounded-pill">
                <span className="fw-bold text-dark small">
                  {product.rating.toLocaleString("fa-IR")}
                </span>
                <i className="bi bi-star-fill text-warning small"></i>
              </div>
            </div>

            <h1 className="h3 fw-bold text-dark mb-3">{product.title}</h1>

            <p className="text-secondary lh-lg mb-4">{product.description}</p>

            {/* ویژگی‌های اطمینان خرید */}
            <div className="row row-cols-1 row-cols-sm-2 g-3 mb-4 py-3 border-top border-bottom">
              <div className="col d-flex align-items-center gap-2 text-secondary small">
                <i className="bi bi-shield-check text-success fs-5"></i>
                <span>گارانتی ۱۸ ماهه معتبر شرکتی</span>
              </div>
              <div className="col d-flex align-items-center gap-2 text-secondary small">
                <i className="bi bi-truck text-primary fs-5"></i>
                <span>ارسال سریع از انبار تهران</span>
              </div>
            </div>

            {/* وضعیت موجودی، قیمت و دکمه افزودن به سبد */}
            <div className="mt-auto pt-2 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
              <div>
                <div className="mb-1">
                  {isOutOfStock ? (
                    <span className="badge bg-danger">ناموجود</span>
                  ) : isLowStock ? (
                    <span className="text-danger small fw-bold">
                      <i className="bi bi-exclamation-circle me-1"></i>
                      تنها {product.stock.toLocaleString("fa-IR")} عدد در انبار باقی مانده
                    </span>
                  ) : (
                    <span className="text-success small fw-medium">
                      <i className="bi bi-check2-circle me-1"></i>
                      موجود در انبار ({product.stock.toLocaleString("fa-IR")} عدد)
                    </span>
                  )}
                </div>

                <div>
                  <span className="fs-3 fw-bold text-dark">
                    {product.price.toLocaleString("fa-IR")}
                  </span>
                  <span className="text-secondary ms-1">تومان</span>
                </div>
              </div>

              {/* دکمه خرید که در اسپرینت سوم به CartContext متصل می‌شود */}
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}