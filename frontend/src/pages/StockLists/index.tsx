import { DocumentData } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import IsLoading from '../../components/IsLoading';
import { getStockCountByCategory, updateOrAddStockCount } from '../../firebase';
import useFormInputs from '../../hooks/useInputFields';
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
  const [yesterdayStock, setYesterdayStock] = useState<Omit<DocumentData, 'createdAt'>>();

  const [itemNames, setItemNames] = useState<string[]>();
  // const [inputLength, setInputLength] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);

  // call custom hook to use the chicken form
  const { formInputs, setFormInputs } = useFormInputs();

  // stockcount and inputs setup
  useEffect(() => {
    (async () => {
      try {
        const stock = await getStockCountByCategory(category!);

        // if todayStock exist, add to the form, otherwise, ignore it
        if (stock.todayCount) {
          // setTodayStock(stock.todayCount);
          setFormInputs(stock.todayCount);
        }
        setYesterdayStock(stock.yesterdayCount);
        setItemNames(stock.itemNames);
        setIsLoading(false);
        // console.log(stock);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [category, setFormInputs]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);

    const { name, value } = event.target;
    // onChange - update the key: value dynamically using [name]: value
    setFormInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // console.log({ dataList });
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // check if inputs are empty
    // validate inputs

    if (!formInputs || !itemNames) return alert('Please complete the count for all items');

    console.log(Object.keys(formInputs));
    const isValid =
      Object.keys(formInputs).length === itemNames.length && Object.values(formInputs).every(value => value);
    if (!isValid) return alert('Certain items not counted yet');
    console.log({ formInputs });

    try {
      const res = await updateOrAddStockCount(category!, formInputs);
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
                <div className="flex justify-between">
                  <label className="font-semibold" htmlFor={excludeUnit(item)}>
                    {replaceUnderscore(item)}:
                  </label>

                  <input
                    className="float-end max-w-20 bg-transparent text-center  placeholder:text-center placeholder:font-bold"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name={excludeUnit(item)}
                    id={excludeUnit(item)}
                    onChange={handleInputChange}
                    placeholder="Count"
                    defaultValue={formInputs && formInputs[excludeUnit(item)]}
                  />
                </div>
                <p className="py-1 text-sm font-medium text-gray-700">
                  Yesterday's count: {yesterdayStock ? `${yesterdayStock[excludeUnit(item)]}` : 'Not Available'}
                </p>
              </div>
            ))}
            <div className="text-gami- mt-10 flex justify-around">
              <Link to="/main-menu/stocks" className="rounded px-4  py-2 font-semibold underline hover:bg-gray-200">
                Cancel
              </Link>
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
