import { useEffect, useState } from 'react';
import { getStockLists } from '../../firebase';
import { StockLists } from '../../types/StockLists';
import ChickenStockList from '../chickenStock';
import SauceStockList from '../sauceStock';

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
        // console.log({ stock });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <h3>Chicken Stock List</h3>
      {stockLists && <ChickenStockList chickenStock={stockLists.Chicken_Inventory} />}

      <h3>Sauce Stock List</h3>
      {stockLists && <SauceStockList sauceStock={stockLists.Sauce_Inventory} />}
    </>
  );
}
