export default function NavBar() {
  return (
    <nav className="relative w-full flex-wrap bg-gami-primary">
      <div className="w-full px-2 pb-3 pt-2">
        <div className="flex justify-center">
          <p
            className="text-2xl font-semibold text-gami-text "
            onClick={() => {
              location.reload();
            }}
          >
            StockWatch <span className="text-xs">1.4</span>
          </p>
        </div>
      </div>
    </nav>
  );
}
