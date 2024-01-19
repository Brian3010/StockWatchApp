import { ChangeEvent, useEffect, useState } from 'react';
import { getAllCategories } from '../../firebase';
import { replaceUnderscore } from '../../utils/helpers';

import StockList from '../StockLists';

export default function StockForms() {
  const [categories, setCategories] = useState<{ value: string; label: string }[]>();
  const [selectedValue, setSelectedValue] = useState<string>();
  //* prolly use useContext or localStorage for persistent display num of item

  useEffect(() => {
    (async () => {
      try {
        const categories = await getAllCategories();
        setCategories(prev => {
          prev = categories.map(c => ({
            value: c,
            label: c.charAt(0).toUpperCase() + replaceUnderscore(c.slice(1)),
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

      <div>{selectedValue && <StockList key={selectedValue} category={selectedValue} />}</div>
    </>
  );
}
