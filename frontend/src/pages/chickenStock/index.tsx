import { FormEvent, useEffect, useState } from 'react';
import { StockLists } from '../../types/StockLists';
import { convertChickenStockToArray, replaceUnderscore } from '../../utils/helpers';

interface ChickenStockListProps {
  chickenStock: StockLists['Chicken_Inventory'];
}

export default function ChickenStockList({ chickenStock }: ChickenStockListProps) {
  const [chickenList, setChickenList] = useState<[string, number][]>();

  useEffect(() => {
    setChickenList(convertChickenStockToArray(chickenStock));
  }, [chickenStock]);

  // chickenList && console.log({ chickenList });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('clicked');
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        {chickenList &&
          chickenList.map((item, index) => (
            <div key={index}>
              <label htmlFor={item[0]}>{replaceUnderscore(item[0])}</label>
              <input type="number" name={item[0]} id={item[0]} />
            </div>
          ))}

        <button type="submit">Update</button>
      </form>
    </>
  );
}
