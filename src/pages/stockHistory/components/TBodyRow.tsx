import { DocumentData } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { excludeUnit, replaceUnderscore } from '../../../utils/helpers';

interface TBodyRowProps {
  stock: DocumentData & { label: string | undefined; item_names: string[] | undefined };
  itemNames: string[];
  lowStockChecked: boolean;
}

const sortingStock = (stock: TBodyRowProps['stock'], itemNames: string[]) => {
  // sort stock in ascending order and exclude ['createdAt', 'label', 'item_names'] from the object
  const tempStock = Object.entries(stock)
    .sort((a, b) => {
      if (a[1] > b[1]) {
        return 1;
      } else {
        return -1;
      }
    })
    .filter(i => !['createdAt', 'label', 'item_names'].includes(i[0]));

  const items = itemNames;
  // get only the keys of stock obj
  const stockItems = tempStock.map(([key]) => key);

  /**
   * loop through the itemNames
   * exclude the unit to be able to get the index of the item in the stockItems array
   * => ["Chips", "Whole_chicken","Fish_cake",...].indexOf("Whole_chicken") => 2
   * then, replace the stock item name at index found with according itemNames
   * for example, at index 2, which is Whole_chicken will be replaced by "Whole chicken (box)"
   */
  for (let i = 0; i < items.length; i++) {
    const tempItem = excludeUnit(items[i]);
    tempStock[stockItems.indexOf(tempItem)][0] = replaceUnderscore(items[i]);
  }

  return tempStock;
};

export default function TBodyRow({ stock, itemNames, lowStockChecked }: TBodyRowProps) {
  const [stockInOrder, setStockInOrder] = useState<[string, number][]>(
    lowStockChecked ? sortingStock(stock, itemNames) : [],
  );
  const hasRendered = useRef(false);

  console.log({ stock, lowStockChecked });

  useEffect(() => {
    if (lowStockChecked && !hasRendered.current) {
      setStockInOrder(sortingStock(stock, itemNames));
      hasRendered.current = true;
    }
  }, [itemNames, lowStockChecked, stock]);

  return lowStockChecked && !!stockInOrder.length
    ? stockInOrder.map(([item, value], index) => (
        <tr className="border-blue-gray-200 border-b" key={index}>
          <td className="px-4 py-3">{item}</td>
          <td className="px-4 py-3">{value}</td>
        </tr>
      ))
    : itemNames.map((item, index) => (
        <tr className="border-blue-gray-200 border-b" key={index}>
          <td className="px-4 py-3">{replaceUnderscore(item)}</td>
          <td className="px-4 py-3">{stock[excludeUnit(item)]}</td>
        </tr>
      ));
}
