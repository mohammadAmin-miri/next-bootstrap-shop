"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Product } from "../../../types";
import ProductCard from "./ProductCard";

interface ProductCatalogProps {
  initialProducts: Product[];
}

const ITEMS_PER_PAGE = 6;

export default function ProductCatalog({
  initialProducts,
}: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ۱. خواندن مقادیر فعلی فیلترها مستقیماً از URL
  const queryParam = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "همه";
  const sortBy = searchParams.get("sort") || "default";
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);

  // استیت محلی فقط برای تایپ روان در اینپوت قبل از اعمال Debounce روی URL
  const [searchState, setSearchState] = useState({
    queryParam,
    value: queryParam,
  });
  if (searchState.queryParam !== queryParam) {
    setSearchState({ queryParam, value: queryParam });
  }
  const searchInput = searchState.value;
  const setSearchInput = (value: string) =>
    setSearchState({ queryParam, value });

  // ۲. تابع کمکی برای ساخت و آپدیت پارامترهای URL
  const updateUrlParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === "" ||
          value === "همه" ||
          value === "default" ||
          (key === "page" && value === "1")
        ) {
          params.delete(key); // حذف مقادیر پیش‌فرض برای تمیز ماندن URL
        } else {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      // استفاده از scroll: false تا هنگام تغییر فیلتر صفحه به بالا نپرد
      router.replace(newUrl, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  // ۳. اعمال Debounce (تأخیر ۵۰۰ میلی‌ثانیه) برای انتقال متن سرچ به URL
  useEffect(() => {
    if (searchInput === queryParam) return;

    const timer = setTimeout(() => {
      updateUrlParams({ q: searchInput.trim(), page: "1" });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, queryParam, updateUrlParams]);

  // ۴. استخراج داینامیک دسته‌بندی‌ها
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(initialProducts.map((p) => p.category))
    );
    return ["همه", ...uniqueCategories];
  }, [initialProducts]);

  // ۵. فیلتر و مرتب‌سازی محصولات بر اساس مقادیر خوانده‌شده از URL
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = initialProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "همه" || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(queryParam.toLowerCase()) ||
        product.description.toLowerCase().includes(queryParam.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    if (sortBy === "rating") {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [initialProducts, selectedCategory, queryParam, sortBy]);

  // ۶. محاسبات صفحه‌بندی (Pagination)
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );
  const safeCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedProducts, safeCurrentPage]);

  // هندلرهای تغییر فیلترها
  const handleCategoryChange = (category: string) => {
    updateUrlParams({ category, page: "1" });
  };

  const handleSortChange = (sortValue: string) => {
    updateUrlParams({ sort: sortValue, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    updateUrlParams({ page: String(newPage) });
  };

  const handleResetFilters = () => {
    setSearchInput("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div>
      {/* نوار ابزار جستجو، فیلتر و مرتب‌سازی */}
      <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 mb-4 bg-white">
        <div className="row g-3 align-items-center">
          {/* باکس جستجو */}
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-secondary rounded-start-3">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="جستجو در نام یا مشخصات محصول..."
                className="form-control bg-light border-start-0 rounded-end-3 shadow-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    updateUrlParams({ q: null, page: "1" });
                  }}
                  className="btn btn-light border text-secondary"
                  title="پاک کردن جستجو"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>

          {/* انتخاب‌گر مرتب‌سازی */}
          <div className="col-12 col-sm-6 col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-light text-secondary rounded-start-3">
                <i className="bi bi-sort-down"></i>
              </span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="form-select bg-light shadow-none rounded-end-3"
                aria-label="مرتب‌سازی محصولات"
              >
                <option value="default">مرتب‌سازی پیش‌فرض</option>
                <option value="price-asc">ارزان‌ترین به گران‌ترین</option>
                <option value="price-desc">گران‌ترین به ارزان‌ترین</option>
                <option value="rating">بالاترین امتیاز کاربران</option>
              </select>
            </div>
          </div>

          {/* شمارنده نتایج */}
          <div className="col-12 col-sm-6 col-md-3 text-sm-end">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-3">
              نمایش {filteredAndSortedProducts.length.toLocaleString("fa-IR")}{" "}
              محصول
            </span>
          </div>
        </div>

        {/* دکمه‌های فیلتر دسته‌بندی */}
        <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-3 border-top">
          <span className="text-secondary small ms-2">
            <i className="bi bi-funnel me-1"></i>
            دسته‌بندی:
          </span>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`btn btn-sm rounded-pill px-3 py-1 fw-medium ${
                selectedCategory === category
                  ? "btn-primary shadow-sm"
                  : "btn-light text-secondary border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* نمایش گرید محصولات یا پیام عدم یافتن نتیجه */}
      {paginatedProducts.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center my-4 bg-white">
          <div className="py-3">
            <i className="bi bi-search text-secondary display-4 mb-3 d-block"></i>
            <h3 className="h5 fw-bold text-dark mb-2">
              محصولی با این مشخصات یافت نشد!
            </h3>
            <p className="text-secondary small mb-4">
              واژه دیگری را جستجو کنید یا فیلترهای اعمال شده را پاک نمایید.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn btn-outline-primary rounded-3 px-4 py-2 d-inline-flex align-items-center gap-2"
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              <span>پاک کردن تمام فیلترها</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="col">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* کنترلر صفحه‌بندی (Pagination) */}
          {totalPages > 1 && (
            <nav
              aria-label="صفحه‌بندی محصولات"
              className="mt-5 d-flex justify-content-center"
            >
              <ul className="pagination pagination-md gap-2 mb-0">
                <li
                  className={`page-item ${
                    safeCurrentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      handlePageChange(Math.max(1, safeCurrentPage - 1))
                    }
                    className="page-link rounded-3 border-0 shadow-sm px-3 py-2 text-dark"
                  >
                    <i className="bi bi-chevron-right small me-1"></i>
                    قبلی
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        safeCurrentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handlePageChange(page)}
                        className={`page-link rounded-3 border-0 shadow-sm px-3 py-2 fw-bold ${
                          safeCurrentPage === page
                            ? "bg-primary text-white"
                            : "bg-white text-dark"
                        }`}
                      >
                        {page.toLocaleString("fa-IR")}
                      </button>
                    </li>
                  )
                )}

                <li
                  className={`page-item ${
                    safeCurrentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      handlePageChange(
                        Math.min(totalPages, safeCurrentPage + 1)
                      )
                    }
                    className="page-link rounded-3 border-0 shadow-sm px-3 py-2 text-dark"
                  >
                    بعدی
                    <i className="bi bi-chevron-left small ms-1"></i>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
}