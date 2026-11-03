export default function ProductDetailLoading() {
  return (
    <div className="py-2 placeholder-glow">
      <div className="mb-4">
        <span className="placeholder col-3 rounded-2 py-2"></span>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="row g-0">
          <div className="col-lg-5 p-4 bg-secondary bg-opacity-10">
            <div
              className="placeholder w-100 rounded-4"
              style={{ height: "380px" }}
            ></div>
          </div>

          <div className="col-lg-7 p-4 p-lg-5 d-flex flex-column">
            <div className="d-flex justify-content-between mb-3">
              <span className="placeholder col-3 rounded-pill py-3"></span>
              <span className="placeholder col-2 rounded-pill py-3"></span>
            </div>

            <span className="placeholder col-8 py-3 mb-3 rounded-2"></span>
            <span className="placeholder col-12 mb-2 rounded-1"></span>
            <span className="placeholder col-10 mb-4 rounded-1"></span>

            <div className="mt-auto pt-4 border-top d-flex justify-content-between align-items-center">
              <span className="placeholder col-4 py-3 rounded-2"></span>
              <span className="placeholder col-4 py-4 rounded-3 bg-primary"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}