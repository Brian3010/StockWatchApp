export default function IsLoading() {
  return (
    <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transform">
      <div
        className="inline-block size-10 animate-spin rounded-full border-[4px] border-current border-t-transparent text-gami-link"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

// text-gami-link
