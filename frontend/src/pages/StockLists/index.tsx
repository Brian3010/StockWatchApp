import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
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
      <div className="flex border-b p-4 ">
        <BackButton className="mr-auto" to="/main-menu/stocks" />
        <p className="mr-auto text-lg font-bold ">{replaceUnderscore(category!)}</p>
      </div>
      {isLoading ? <IsLoading /> : <div className="mt-8 border-t ">{stockLists && <Forms stock={stockLists} />}</div>}
    </>
  );
}
