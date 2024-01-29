import { ChangeEvent, FormEvent, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GetStockCountByCategoryT, updateOrAddStockCount } from '../../../firebase';
import useFormInputs from '../../../hooks/useInputFields';
import { excludeUnit, replaceUnderscore } from '../../../utils/helpers';

interface FormsProps {
  stock: GetStockCountByCategoryT;
}

export default function Forms({ stock }: FormsProps) {
  const { category } = useParams();
  const navigate = useNavigate();

  // const [inputLength, setInputLength] = useState<number>();

  // call custom hook to use the chicken form
  const { formInputs, setFormInputs } = useFormInputs();

  useEffect(() => {
    if (stock.todayCount) {
      setFormInputs(stock.todayCount);
    }
  }, [setFormInputs, stock.todayCount]);

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

    if (!formInputs || !stock.itemNames) return alert('Please complete the count for all items');

    console.log(Object.keys(formInputs));
    const isValid =
      Object.keys(formInputs).length === stock.itemNames.length && Object.values(formInputs).every(value => value);
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
      <form action="" onSubmit={handleSubmit}>
        <div className="flex justify-between border-b bg-neutral-100 p-1 py-3 font-bold">
          <span>Name</span>
          <span className="pr-9">No.</span>
        </div>
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
                onChange={handleInputChange}
                placeholder="Count"
                defaultValue={formInputs && formInputs[excludeUnit(item)]}
              />
            </div>
            <p className="py-1 text-sm font-medium text-gray-700">
              Yesterday's count: {stock.yesterdayCount ? `${stock.yesterdayCount[excludeUnit(item)]}` : 'Not Available'}
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
    </>
  );
}
