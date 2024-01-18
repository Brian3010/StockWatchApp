import { ChangeEvent, useEffect, useState } from 'react';
import { StockListsData, getStockListsV1, getStockListsV2 } from '../../firebase';
import { replaceUnderscore } from '../../utils/helpers';

import StockList from '../StockLists';

export default function StockForms() {
  const [stockLists, setStockLists] = useState<StockListsData>();
  const [categories, setCategories] = useState<{ value: string; label: string }[]>();
  const [selectedValue, setSelectedValue] = useState<string>();
  //* prolly use useContext or localStorage for persistent display num of item

  useEffect(() => {
    (async () => {
      try {
        const stock = await getStockListsV1();
        const stockV2 = await getStockListsV2();
        console.log({ stockV2 });
        setStockLists(stock);
        setCategories(prev => {
          prev = stock.options.map(opt => ({
            value: opt,
            label: opt.charAt(0).toUpperCase() + replaceUnderscore(opt.slice(1)),
          }));
          return prev;
        });

        // console.log(stock.options);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  // categories && categories.length > 0 && console.log(categories);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <h3>Stock Lists</h3>

      {/* render categories */}
      <div>
        <label htmlFor="categoties">Categories: </label>
        <select id="categories" onChange={handleCategoryChange}>
          <option value="">Select...</option>
          {categories &&
            categories.map((c, index) => (
              <option key={index} label={c.label} value={c.value}>
                {c.label}
              </option>
            ))}
        </select>
        <div>selected category: {selectedValue}</div>
      </div>

      <div>
        {stockLists && selectedValue && (
          <StockList key={selectedValue} category={selectedValue} stockList={stockLists.data} />
        )}
      </div>

      {/* <h3>Sauce Stock List</h3>
      {stockLists && <SauceStockList sauceStock={stockLists.Sauce_Inventory} />} */}
    </>
  );
}
