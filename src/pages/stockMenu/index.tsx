import { useEffect, useState } from 'react';
import getCategories, {getAllCategoriesT} from '../../firebase/fetchStock/getCategories';

import { Link } from 'react-router-dom';
import FlashMessage from '../../components/FlashMessage';
import Heading from '../../components/Heading';
import IsLoading from '../../components/IsLoading';

export default function StockMenu() {
  const [categories, setCategories] = useState<getAllCategoriesT>();
  const [isLoading, setIsLoading] = useState(false);
  //* prolly use useContext or localStorage for persistent display num of item

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const categoryLists = await getCategories();
        console.log({ categoryLists });
        setCategories(categoryLists);

        setIsLoading(false);
        // console.log(stock.options);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);
  // categories && categories.length > 0 && console.log(categories);
  console.log({ categories });

  return (
    <>
      <Heading to="../" headerName="Stock Lists" />

      {/* render categories */}
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <h1 className="pb-3 pt-20 text-xl font-semibold">Select a count list</h1>
          <div className="rounded-md border">
            {categories &&
              categories.map((c, index) => (
                <Link key={index} className="relative flex flex-col gap-1 border-b p-5" to={`/stocks/${c.category}`}>
                  <span className="font-medium">{c.category}</span>

                  <span
                    className={`inline-block w-fit rounded-xl ${c.createdAt ? ` bg-green-200 text-emerald-700` : `bg-gray-200 text-gray-700`}  px-3  py-1 text-xs font-semibold`}
                  >
                    {c.createdAt ? `Updated on ${c.createdAt}` : 'Not yet updated today'}
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
              ))}
          </div>
        </>
      )}
      <FlashMessage />
    </>
  );
}
