import { useEffect, useState } from 'react';
import { getAllCategories } from '../../firebase';
import { replaceUnderscore } from '../../utils/helpers';

import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';

export default function StockForms() {
  const [categories, setCategories] = useState<{ value: string; label: string; createdAt: string | undefined }[]>();
  //* prolly use useContext or localStorage for persistent display num of item

  useEffect(() => {
    (async () => {
      try {
        const categoryLists = await getAllCategories();
        // console.log({ categoryLists });
        setCategories(prev => {
          prev = categoryLists.map(c => ({
            value: c.category,
            label: c.category.charAt(0).toUpperCase() + replaceUnderscore(c.category.slice(1)),
            createdAt: c.createdAt,
          }));
          console.log({ prev });
          return prev;
        });

        // console.log(stock.options);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  // categories && categories.length > 0 && console.log(categories);

  return (
    <>
      <div className="flex border-b p-4">
        <BackButton className="mr-auto" to="../" />
        <p className="mr-auto font-medium">Stock List</p>
      </div>

      {/* render categories */}
      <div className="px-1 py-5 sm:px-0">
        {categories &&
          categories.map((c, index) => (
            <div key={index}>
              <Link to={`/main-menu/stocks/${c.value}`}>{c.label}</Link>
              <p>Status: {c.createdAt ? `updated at ${c.createdAt}` : 'Not yet updated'}</p>
            </div>
          ))}
      </div>
    </>
  );
}
