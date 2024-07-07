export default function NavBar() {
  return (
    <nav className="relative w-full flex-wrap">
      <div className="w-full px-2 pb-3 pt-2">
        <div className="flex justify-center">
          <p
            className="text-2xl font-semibold text-gami-text"
            onClick={() => {
              location.reload();
            }}
          >
            <span className="underline">StockWatch</span> <span className="text-xs underline">1.4.2</span>
          </p>
        </div>
      </div>
    </nav>
  );
}
