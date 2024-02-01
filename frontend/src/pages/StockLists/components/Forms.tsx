import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import IsLoading from '../../../components/IsLoading';
import { GetStockCountByCategoryT, updateOrAddStockCount } from '../../../firebase';
import useFormInputs from '../../../hooks/useInputFields';
import { excludeUnit, replaceUnderscore, validateStockFormInputs } from '../../../utils/helpers';

interface FormsProps {
  stock: GetStockCountByCategoryT;
}

export default function Forms({ stock }: FormsProps) {
  const { category } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // const [inputLength, setInputLength] = useState<number>();

  // call custom hook to use the chicken form
  const { formInputs, setFormInputs } = useFormInputs();

  useEffect(() => {
    if (stock.todayCount) {
      const todayStock = stock.todayCount;
      setFormInputs(() => {
        const arrayOfObjects = Object.keys(todayStock).map(item => {
          return { [item]: todayStock[item].toString() };
        });
        return Object.assign({}, ...arrayOfObjects);
      });
    }

    return () => {
      setFormInputs(undefined);
    };
  }, [setFormInputs, stock.todayCount]);

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target);

    const { name, value } = event.target;
    // onChange - update the key: value dynamically using [name]: value
    setFormInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // console.log({ formInputs });

    console.log(validateStockFormInputs(formInputs, stock.itemNames));
    if (!validateStockFormInputs(formInputs, stock.itemNames)) return alert('Certain items not counted yet');

    // console.log({ formInputs });
    try {
      setIsLoading(true);
      const res = await updateOrAddStockCount(category!, formInputs!);
      console.log(res);
      //TODO: onSuccess: redirect to homepage and display flash message

      setIsLoading(false);
      return navigate('..', { relative: 'path' });
    } catch (error) {
      console.error(error);
      //TODO: onError: redirect to homepage  display error as flash message
    }
  };

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <form action="" onSubmit={handleSubmit}>
          <div className="flex justify-between border-b bg-neutral-100 p-1 py-3 font-bold ">
            <span>Name</span>
            <span className="pr-9">No.</span>
          </div>
          <div className="xl:scrollbar-hide xl:h-[670px] xl:overflow-scroll">
            {stock.itemNames.map((item, index) => (
              <div key={index} className="border-b p-1 py-3">
                <div className="flex justify-between">
                  <label className="font-semibold" htmlFor={excludeUnit(item)}>
                    {replaceUnderscore(item)}:
                  </label>

                  <input
                    className="float-end max-w-20 bg-transparent text-center  placeholder:text-center placeholder:font-bold"
                    type="number"
                    min="0"
                    inputMode="decimal"
                    // pattern="[0-9]*"
                    step="0.01"
                    name={excludeUnit(item)}
                    id={excludeUnit(item)}
                    onInput={handleOnInputChange}
                    placeholder={'Count'}
                    defaultValue={formInputs && formInputs[excludeUnit(item)]}
                  />
                </div>
                <p className="py-1 text-sm font-medium text-gray-700">
                  Yesterday's count:{' '}
                  {stock.yesterdayCount ? `${stock.yesterdayCount[excludeUnit(item)]}` : 'Not Available'}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-around">
            <Link to=".." relative="path" className="rounded px-4  py-2 font-semibold underline hover:bg-gray-200">
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
      )}
    </>
  );
}
