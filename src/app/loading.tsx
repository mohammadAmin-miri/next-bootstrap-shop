export default function GlobalLoading() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center py-5 my-5"
      style={{ minHeight: "55vh" }}
    >
      <div
        className="spinner-border text-primary mb-3"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-secondary fw-medium small mb-0">
        Loading page...
      </p>
    </div>
  );
}