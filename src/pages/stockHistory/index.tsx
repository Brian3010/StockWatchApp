import { ChangeEventHandler, useState } from 'react';
import Heading from '../../components/Heading';
import IsLoading from '../../components/IsLoading';
import NoDataIcon from '../../components/NoDataIcon';
import { isObjectEmpty } from '../../utils/helpers';
import StockTabs from './components/StockTabs';
import getStockListsByDate, { GetStockListsByDateT } from '../../firebase/fetchStock/getStockListByDate';

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
      <div className="pt-20 px-1 sm:px-0">
        <div className="mb-3 font-medium">
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
          <div className="xl:scrollbar-hide mt-7 font-semibold xl:h-[750px] xl:overflow-scroll">
            {!stockLists && <div className="pt-10 text-center">Please select a date to view the stock</div>}
            {stockLists && isObjectEmpty(stockLists) && (
              <div className="flex flex-col items-center justify-center gap-2 pt-36">
                <NoDataIcon />
                <div className="text-center">Stock not submited on this day</div>
              </div>
            )}
            {stockLists && !isObjectEmpty(stockLists) && <StockTabs stockLists={stockLists} />}
          </div>
        )}
      </div>
    </>
  );
}
