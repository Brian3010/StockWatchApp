export default function IsLoading() {
  return (
    <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transform">
      <div
        className="inline-block h-9 w-9 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-gami-link motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
}
