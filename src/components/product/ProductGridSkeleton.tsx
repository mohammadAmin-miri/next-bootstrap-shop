export default function ProductGridSkeleton() {
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 placeholder-glow">
      {skeletonItems.map((_, index) => (
        <div key={index} className="col">
          <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            {/* Product image skeleton */}
            <div
              className="placeholder w-100 bg-secondary bg-opacity-25"
              style={{ height: "220px" }}
            ></div>

            <div className="card-body d-flex flex-column p-4">
              {/* Stock status and rating skeleton */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="placeholder col-4 rounded-1 py-2"></span>
                <span className="placeholder col-2 rounded-1 py-2"></span>
              </div>

              {/* Two-line title skeleton */}
              <span className="placeholder col-10 rounded-1 py-2 mb-2"></span>
              <span className="placeholder col-7 rounded-1 py-2 mb-4"></span>

              {/* Price and view button skeleton */}
              <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                <span className="placeholder col-5 rounded-2 py-3"></span>
                <span className="placeholder col-4 rounded-3 py-3 bg-primary"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}