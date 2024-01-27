import { DocumentData } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import IsLoading from '../../components/IsLoading';
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
      <div className="flex border-b p-4 ">
        <BackButton className="mr-auto" to="/main-menu/stocks" />
        <p className="mr-auto text-lg font-bold ">{replaceUnderscore(category!)}</p>
      </div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="mt-8 border-t">
          <form action="" onSubmit={handleSubmit}>
            {itemNames!.map((item, index) => (
              <div key={index} className="border-b p-1 py-3">
                <label className="font-semibold" htmlFor={excludeUnit(item)}>
                  {replaceUnderscore(item)}
                </label>
                :
                <input
                  className="float-end rounded border"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name={excludeUnit(item)}
                  id={excludeUnit(item)}
                  onChange={handleInputChange}
                  placeholder="Count"
                />
                <p className="py-1 text-sm text-gray-800">
                  yesterday's count: {stockCount ? `${stockCount[excludeUnit(item)]}` : 'Hom qua ko dem ha?'}
                </p>
              </div>
            ))}
            <div className="text-gami- mt-10 flex justify-around">
              <a href="/main-menu/stocks" className="rounded px-4  py-2 font-semibold underline hover:bg-gray-200">
                Cancel
              </a>
              <button
                className="rounded  bg-gami-primary px-4 py-2 font-bold text-gami-text hover:brightness-90"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
