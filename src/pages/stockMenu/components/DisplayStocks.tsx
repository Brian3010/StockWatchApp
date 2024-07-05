import { Link } from 'react-router-dom';

interface DisplayStocksProps {
  index: number;
  catergory: {
    category: string;
    createdAt: string | undefined;
  };
}
export default function DisplayStocks({ index, catergory }: DisplayStocksProps) {
  return (
    <Link key={index} className="relative flex flex-col gap-1 border-b p-5" to={`/stocks/${catergory.category}`}>
      <span className="font-medium">{catergory.category}</span>

      <span
        className={`inline-block w-fit rounded-xl ${catergory.createdAt ? ` bg-green-200 text-emerald-700` : `bg-gray-200 text-gray-700`}  px-3  py-1 text-xs font-semibold`}
      >
        {catergory.createdAt ? `Updated on ${catergory.createdAt}` : 'Not yet updated today'}
      </span>

      <div className="pr-inherit absolute right-0 top-1/2 -translate-y-1/2 transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className=" h-6 w-6 text-gami-link"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </Link>
  );
}
