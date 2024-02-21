import { ChangeEventHandler, useState } from 'react';
import Heading from '../../components/Heading';
import IsLoading from '../../components/IsLoading';
import { GetStockListsByDateT, getStockListsByDate } from '../../firebase';
import { isObjectEmpty } from '../../utils/helpers';
import StockTabs from './components/StockTabs';

export default function StockHistory() {
  const [stockLists, setStockLists] = useState<GetStockListsByDateT>();
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange: ChangeEventHandler<HTMLInputElement> = async event => {
    const { value } = event.target;
    const splitValue = value.split('-');
    const dateSelected = `${splitValue[2]}-${splitValue[1]}-${splitValue[0]}`;
    console.log({ dateSelected });

    try {
      setIsLoading(true);
      const stockLists = await getStockListsByDate(dateSelected);
      console.log({ stockLists });
      setStockLists(stockLists);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/** heading */}
      <Heading to="../" headerName="Stock History" />

      {/** content */}
      <div className="mt-8 px-1 sm:px-0">
        <div className="mb-3 ">
          <label htmlFor="stock-history-date">Select a date: </label>
          <input
            className="rounded-md border border-black hover:bg-gray-100"
            type="date"
            id="stock-history-date"
            onChange={handleDateChange}
          />
        </div>

        {/** stock dipslay */}
        {isLoading ? (
          <IsLoading />
        ) : (
          <div className="xl:scrollbar-hide mt-7 xl:h-[750px] xl:overflow-scroll">
            {!stockLists && <div className="text-center">Please select a date to view the stock</div>}
            {stockLists && isObjectEmpty(stockLists) && (
              <div className="text-center">Stock not submited on this day</div>
            )}
            {stockLists && !isObjectEmpty(stockLists) && <StockTabs stockLists={stockLists} />}
          </div>
        )}
      </div>
    </>
  );
}
