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
      <h1>Stock History</h1>
      <BackButton to="../" />
      <div>
        <label htmlFor="stock-history-date">Select Date: </label>
        <input type="date" id="stock-history-date" onChange={handleDateChange} />
      </div>

      <div className="w-full max-w-l px-1 py-3 sm:px-0 text-sm">
        {(stockLists && !isObjectEmpty(stockLists) && <StockTabs stockLists={stockLists} />) || (
          <div className="text-center ">Stock not submited on this day</div>
        )}
      </div>
    </>
  );
}
