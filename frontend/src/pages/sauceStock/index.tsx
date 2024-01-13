import { useEffect, useState } from 'react';
import { StockLists } from '../../types/StockLists';
import { convertSauceStockToArray, replaceUnderscore } from '../../utils/helpers';

interface SauceStockProps {
  sauceStock: StockLists['Sauce_Inventory'];
}

export default function SauceStockList({ sauceStock }: SauceStockProps) {
  const [sauceList, setSauceList] = useState<[string, number][]>();

  useEffect(() => {
    setSauceList(convertSauceStockToArray(sauceStock));
  }, [sauceStock]);

  //   sauceList && console.log({ sauceList });

  return (
    <>
      <h3>Chicken Stock List</h3>

      <form action="">
        {sauceList &&
          sauceList.map((item, index) => (
            <div key={index}>
              <label htmlFor={item[0]}>{replaceUnderscore(item[0])}</label>
              <input type="number" name={item[0]} id={item[0]} />
            </div>
          ))}
      </form>
    </>
  );
}
