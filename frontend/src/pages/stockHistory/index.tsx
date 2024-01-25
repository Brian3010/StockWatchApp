import { ChangeEventHandler, useState } from 'react';
import BackButton from '../../components/BackButton';
import { GetStockListsByDateT, getStockListsByDate } from '../../firebase';
import { isObjectEmpty } from '../../utils/helpers';
import StockTabs from './components/StockTabs';

export default function StockHistory() {
  const [stockLists, setStockLists] = useState<GetStockListsByDateT>();

  const handleDateChange: ChangeEventHandler<HTMLInputElement> = async event => {
    const { value } = event.target;
    const splitValue = value.split('-');
    const dateSelected = `${splitValue[2]}-${splitValue[1]}-${splitValue[0]}`;
    // console.log({ dateSelected });

    try {
      const stockLists = await getStockListsByDate(dateSelected);
      console.log({ stockLists });
      setStockLists(stockLists);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/** heading */}
      <div className="flex border-b p-4">
        <BackButton className="mr-auto" to="../" />
        <p className="mr-auto font-medium">Stock History</p>
      </div>

      {/** content */}
      <div className="px-1 py-8 sm:px-0">
        <div className="mb-3">
          <label htmlFor="stock-history-date">Select date: </label>
          <input
            className="border border-black hover:bg-gray-100"
            type="date"
            id="stock-history-date"
            onChange={handleDateChange}
          />
        </div>

        {/** stock dipslay */}
        <div className='mt-10'>
          {!stockLists && <div className="text-center">Please select a date to view the stock</div>}
          {stockLists && isObjectEmpty(stockLists) && <div className="text-center">Stock not submited on this day</div>}
          {stockLists && !isObjectEmpty(stockLists) && <StockTabs stockLists={stockLists} />}
        </div>
      </div>
    </>
  );
}
