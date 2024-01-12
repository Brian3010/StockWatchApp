import { useEffect, useState } from 'react';
import { getStockLists } from '../../firebase';
import { StockLists } from '../../types/StockLists';
import ChickenStockList from '../chickenStock';

export default function StockForms() {
  const [stockLists, setStockLists] = useState<StockLists>();
  // const [chickenList, setChickenList] = useState<Record<keyof Chicken_Inventory,number>>();
  
  //* prolly use useContext or localStorage for persistent display num of item

  if (stockLists) {
    // for (const [key, value] of Object.entries(stockLists.Sauce_Inventory)) {
    //   console.log(`${key}: ${value}`);
    // }
  }

  useEffect(() => {
    (async () => {
      try {
        const stock = await getStockLists();
        setStockLists(stock);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <h2>display both forms here</h2>
      {stockLists && <ChickenStockList chickenStock={stockLists.Chicken_Inventory} />}
    </>
  );
}
