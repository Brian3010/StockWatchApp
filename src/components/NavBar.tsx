export default function NavBar() {
  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between">
      <div className="w-full px-6 py-4">
        <div className="flex justify-between">
          <p className="text-xl font-medium"  onClick={()=>{location.reload()}}>
            StockWatch
          </p>
          <span className="flex items-center text-sm underline">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mb-1 h-4 w-4">
              <path
                fillRule="evenodd"
                d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                clipRule="evenodd"
              />
            </svg>
            <a href="https://www.gamichicken.com.au/restaurant/hawthorn/" target="_blank">Gami Hawthorn</a>
          </span>
        </div>
      </div>
    </nav>
  );
}
