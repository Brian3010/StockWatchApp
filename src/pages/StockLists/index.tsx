import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../../components/Heading';
import IsLoading from '../../components/IsLoading';
import getStockCountByCategory, { GetStockCountByCategoryT } from '../../firebase/fetchStock/getStockCountByCategory';
import { replaceUnderscore } from '../../utils/helpers';
import Forms from './components/Forms';
import FrontForm from './components/FrontForm';

// interface StockListProps {
//   // stockList: DocumentData[];
//   // stockItems: string[][];
//   // yesterdayStock: DocumentData[];
//   category: string;
// }

export default function StockList() {
  const { category } = useParams();

  const [stockLists, setStockLists] = useState<GetStockCountByCategoryT>();

  const [isLoading, setIsLoading] = useState(true);

  // stockcount and inputs setup
  useEffect(() => {
    (async () => {
      try {
        const stock = await getStockCountByCategory(category!);
        setStockLists(stock);

        setIsLoading(false);
        // console.log(stock);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [category]);

  return (
    <>
      <Heading to="/stocks" headerName={replaceUnderscore(category!)} />

      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="border-t pt-20">
          {(stockLists && category && !category.includes('Front List') && <Forms stock={stockLists} />) || (
            <FrontForm stock={stockLists!} />
          )}
        </div>
      )}
    </>
  );
}
