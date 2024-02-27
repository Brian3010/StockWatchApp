export default function NavBar() {
  return (
    <nav className="justify-betwee relative flex w-full flex-wrap items-center ">
      <div className="w-full px-2 py-4">
        <div className="flex justify-center">
          <p
            className="text-2xl font-semibold text-gami-text "
            onClick={() => {
              location.reload();
            }}
          >
            StockWatch
          </p>
        </div>
      </div>
    </nav>
  );
}
