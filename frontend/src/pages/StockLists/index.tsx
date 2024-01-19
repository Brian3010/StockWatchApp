import { DocumentData } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getStockCountByCategory, updateStockCount } from '../../firebase';
import useInputFields from '../../hooks/useInputFields';
import { excludeUnit, replaceUnderscore } from '../../utils/helpers';

interface StockListProps {
  // stockList: DocumentData[];
  // stockItems: string[][];
  // yesterdayStock: DocumentData[];
  category: string;
}

export default function StockList({ category }: StockListProps) {
  const [stockCount, setStockCount] = useState<DocumentData>();
  const [itemNames, setItemNames] = useState<string[]>();
  const [inputLength, setInputLength] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  // call custom hook to use the chicken form
  const { inputData, setInputData } = useInputFields();

  useEffect(() => {
    (async () => {
      try {
        const stock = await getStockCountByCategory(category);
        setStockCount(stock.yesterdayCount);
        setItemNames(stock.itemNames);
        setIsLoading(false);
        console.log(stock);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [category]);

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
    //TODO: testing input validation
    //TODO: refactor the update request, as database has changed
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form action="" onSubmit={handleSubmit}>
          {itemNames!.map((item, index) => (
            <div key={index}>
              <label htmlFor={excludeUnit(item)}>{replaceUnderscore(item)}</label>:{' '}
              <input type="number" name={excludeUnit(item)} id={excludeUnit(item)} onChange={handleInputChange} />
              <p>yesterday's count: {stockCount ? `${stockCount[excludeUnit(item)]}` : 'Hom qua ko dem ha?'}</p>
            </div>
          ))}
          <button type="submit">Update</button>
        </form>
      )}
    </>
  );
}
