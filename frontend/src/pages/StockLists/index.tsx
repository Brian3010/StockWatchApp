import { DocumentData } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ChickenInventoryFields, SauceInventoryFields, updateStockCount } from '../../firebase';
import useInputFields from '../../hooks/useInputFields';
import { convertDocDataToArray } from '../../utils/helpers';

interface StockListProps {
  stockList: DocumentData[];
  category: string;
}

export default function StockList({ stockList, category }: StockListProps) {
  const [dataList, setDataList] = useState<[string, number][]>();
  const [inputLength, setInputLength] = useState<number>();
  // console.log(stockList);
  // call custom hook to use the chicken form
  const { inputData, setInputData } = useInputFields();

  useEffect(() => {
    //* use switch if to many inventories,
    console.log(category);
    // check which inventory is selected, then extract value using keys in {...InventoryFields}
    if (category === 'chicken_inventory') {
      setDataList(convertDocDataToArray(stockList[0], ChickenInventoryFields));
      setInputLength(ChickenInventoryFields.length);
    }
    if (category === 'sauce_inventory') {
      setDataList(convertDocDataToArray(stockList[1], SauceInventoryFields));
      setInputLength(SauceInventoryFields.length);
    }
  }, [category, stockList, inputData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    // onChange - update the key: value dynamically using [name]: value
    setInputData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // console.log({ dataList });
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // if input empty, take users those empty
    const isValid =
      inputData &&
      Object.keys(inputData).length === inputLength &&
      Object.values(inputData).every(it => it.trim() !== '');
    // console.log({ isValid });
    if (!isValid || !inputData) return alert("Some item's are empty");

    console.log({ inputData });
    try {
      const res = await updateStockCount(category, inputData);
      //TODO: redirect to homepage/main menu when successfully updated
      console.log(res);
      // if (es)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        {dataList &&
          dataList.map((item, index) => (
            <div key={index}>
              <label htmlFor={item[0]}>{item[0]}</label>:{' '}
              <input type="number" name={item[0]} id={item[0]} onChange={handleInputChange} />
              <p>last stock: {item[1]}</p>
            </div>
          ))}

        <button type="submit">Update</button>
      </form>
    </>
  );
}
