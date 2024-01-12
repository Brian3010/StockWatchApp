import { useEffect, useState } from 'react';
import { Chicken_Inventory } from '../../types/Chicken_Inventory';
import { StockLists } from '../../types/StockLists';

interface ChickenStockListProps {
  chickenStock: StockLists['Chicken_Inventory'];
}

export default function ChickenStockList({ chickenStock }: ChickenStockListProps) {
  const [chickenList, setChickenList] = useState<[keyof Chicken_Inventory, number][]>();
  //TODO: make a form outof the chickenList array
  useEffect(() => {
    const list: [keyof Chicken_Inventory, number][] = [];
    Object.entries(chickenStock).map(stock => {
      list.push(stock as [keyof Chicken_Inventory, number]);
    });
    console.log(list);
    setChickenList(list);
  }, [chickenStock]);

  chickenList && console.log({ chickenList });

  return (
    <>
      <div>Chicken Stock List</div>

      {chickenList && (
        <ul>
          {chickenList.map((list, index) => (
            <li key={index}>{`${list[0]} : ${list[1]}`}</li>
          ))}
        </ul>
      )}
    </>
  );
}
