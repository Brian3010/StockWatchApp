import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../../components/Heading';
import IsLoading from '../../components/IsLoading';
import { GetStockCountByCategoryT, getStockCountByCategory } from '../../firebase';
import { replaceUnderscore } from '../../utils/helpers';
import Forms from './components/Forms';

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

      {isLoading ? <IsLoading /> : <div className="border-t pt-20">{stockLists && <Forms stock={stockLists} />}</div>}
    </>
  );
}
