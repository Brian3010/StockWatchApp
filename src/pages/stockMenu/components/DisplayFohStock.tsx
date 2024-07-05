import { useEffect, useState } from 'react';
import CompressingIcon from '../../../components/CompressingIcon';
import { getAllCategoriesT } from '../../../firebase/fetchStock/getBohCategories';
import getFohCategories from '../../../firebase/fetchStock/getFohCategories';
import DisplayStocks from './DisplayStocks';

export default function DisplayBohStock() {
  const [categories, setCategories] = useState<getAllCategoriesT>();
  const [isLoading, setIsLoading] = useState(false);
  //* prolly use useContext or localStorage for persistent display num of item

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const categoryLists = await getFohCategories();
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
  return isLoading ? (
    <>
      <div className="pt-10">
        <CompressingIcon />
      </div>
    </>
  ) : (
    <div className="rounded-md border">
      {categories && categories.map((c, index) => <DisplayStocks key={index} index={index} catergory={c} />)}
    </div>
  );
}
