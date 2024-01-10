import { useEffect, useState } from 'react';
import { StockLists } from '../@types/StockLists';
import { getStockLists } from '../firebase/index';

function App() {
  const [stockLists, setStockLists] = useState<StockLists>();
  // const [chickenList, setChickenList] = useState<Record<keyof Chicken_Inventory,number>>();
  //TODO: Make an array of key and value for Chicken_inventory

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

  if (stockLists) {
    for (const [key, value] of Object.entries(stockLists.Chicken_Inventory)) {
      console.log(`${key}: ${value}`);
    }
    for (const [key, value] of Object.entries(stockLists.Sauce_Inventory)) {
      console.log(`${key}: ${value}`);
    }
  }

  return (
    <>
      <h1>StockWatch App</h1>

      <h2>Chicken Stock</h2>
      <button>click here</button>
    </>
  );
}

export default App;
