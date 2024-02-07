import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [isSpining, setIsSpining] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between bg-gami-primary py-1">
      <div className="relative flex w-full flex-wrap items-center justify-center">
        <div>
          <a className="mx-2 my-1 flex items-center" href="/">
            <div className="flex flex-col items-center">
              <span className="text-lg font-medium text-gami-text ">StockWatch</span>
              <span className="text-sm font-normal">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="float-left h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
                    clipRule="evenodd"
                  />
                </svg>
                Gami Hawthorn
              </span>
              <div className="absolute right-3 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <button
                  onClick={() => {
                    setIsSpining(!isSpining);
                    return navigate(0);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className={`h-7 w-7 text-gami-text ${isSpining && 'animate-spin'}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
}
