import { useEffect, useState } from 'react';
import { getAllCategories } from '../../firebase';
import { replaceUnderscore } from '../../utils/helpers';

import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import FlashMessage from '../../components/FlashMessage';
import IsLoading from '../../components/IsLoading';

export default function StockForms() {
  const [categories, setCategories] = useState<{ value: string; label: string; createdAt: string | undefined }[]>();
  const [isLoading, setIsLoading] = useState(false);
  //* prolly use useContext or localStorage for persistent display num of item

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const categoryLists = await getAllCategories();
        // console.log({ categoryLists });
        setCategories(prev => {
          prev = categoryLists.map(c => ({
            value: c.category,
            label: c.category.charAt(0).toUpperCase() + replaceUnderscore(c.category.slice(1)),
            createdAt: c.createdAt,
          }));
          // console.log({ prev });
          return prev;
        });

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
      <div className="flex border-b p-4 ">
        <BackButton className="mr-auto" to="../" />
        <p className="mr-auto text-lg font-bold ">Stock List</p>
      </div>

      {/* render categories */}
      {isLoading ? (
        <IsLoading />
      ) : (
        <>
          <h1 className="pb-3 pt-8 text-xl font-bold">Select a count list:</h1>
          <div className=" rounded-md border">
            {categories &&
              categories.map((c, index) => (
                <Link
                  key={index}
                  className="relative flex flex-col gap-1 border-b p-5"
                  to={`/main-menu/stocks/${c.value}`}
                >
                  <span className="font-medium">{c.label}</span>

                  <span
                    className={`inline-block w-fit rounded-xl ${c.createdAt ? ` bg-gami-background` : `bg-gami-primary`}  px-3  py-1 text-xs font-medium`}
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
