import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import { updateChickenStockCount } from '../../firebase';
import useChickenForm from '../../hooks/useChickenForm';
import { Chicken_Inventory } from '../../types/Chicken_Inventory';
import { StockLists } from '../../types/StockLists';
import { convertChickenStockToArray, replaceUnderscore } from '../../utils/helpers';

interface ChickenStockListProps {
  chickenStock: StockLists['Chicken_Inventory'];
}

export default function ChickenStockList({ chickenStock }: ChickenStockListProps) {
  const [chickenList, setChickenList] = useState<[string, number][]>();

  // call custom hook to use the chicken form
  const { formData, setFormData } = useChickenForm();

  useEffect(() => {
    setChickenList(convertChickenStockToArray(chickenStock));
  }, [chickenStock]);

  // chickenList && console.log({ chickenList });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    // onChange - update the key: value dynamically using [name]: value
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    console.log(formData);
    // updateChickenStockCount('whole_chicken', 5);
    updateChickenStockCount(formData);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        {chickenList &&
          chickenList.map((item, index) => (
            <div key={index}>
              <label htmlFor={item[0]}>{replaceUnderscore(item[0])}</label>:{' '}
              <input type="number" name={item[0]} id={item[0]} onChange={handleInputChange} />
              <p>last stock: {item[1]}</p>
            </div>
          ))}

        <button type="submit">Update</button>
      </form>
    </>
  );
}
