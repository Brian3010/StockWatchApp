import { DocumentData } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStockCountByCategory, updateOrAddStockCount } from '../../firebase';
import useInputFields from '../../hooks/useInputFields';
import { excludeUnit, replaceUnderscore } from '../../utils/helpers';

// interface StockListProps {
//   // stockList: DocumentData[];
//   // stockItems: string[][];
//   // yesterdayStock: DocumentData[];
//   category: string;
// }

export default function StockList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [stockCount, setStockCount] = useState<DocumentData>();
  const [itemNames, setItemNames] = useState<string[]>();
  // const [inputLength, setInputLength] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  // call custom hook to use the chicken form
  const { inputData, setInputData } = useInputFields();

  // stockcount and inputs setup
  useEffect(() => {
    (async () => {
      try {
        const stock = await getStockCountByCategory(category!);
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
    // check if inputs are empty

    // validate inputs
    const isValid =
      inputData &&
      itemNames &&
      Object.keys(inputData).length === itemNames.length &&
      Object.values(inputData).every(value => value);
    if (!isValid || !inputData) return alert("Some item's are empty");
    console.log({ inputData });

    try {
      const res = await updateOrAddStockCount(category!, inputData);
      console.log(res);
      //TODO: onSuccess: redirect to homepage and display flash message
      return navigate('/main-menu/stocks');
    } catch (error) {
      console.error(error);
      //TODO: onError: redirect to homepage  display error as flash message
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
