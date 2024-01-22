import { ChangeEventHandler, useState } from 'react';
import { GetStockListsByDateT, getStockListsByDate } from '../../firebase';
import { isObjectEmpty } from '../../utils/helpers';

export default function StockHistory() {
  const [date, setDate] = useState<string>();
  const [stockLists, setStockLists] = useState<GetStockListsByDateT>();

  const handleDateChange: ChangeEventHandler<HTMLInputElement> = async event => {
    const { value } = event.target;
    const splitValue = value.split('-');
    const dateSelected = `${splitValue[2]}-${splitValue[1]}-${splitValue[0]}`;
    console.log({ dateSelected });
    setDate(dateSelected);

    try {
      const stockLists = await getStockListsByDate(dateSelected);
      console.log({ stockLists });
      setStockLists(stockLists);
    } catch (error) {
      console.error(error);
    }

    //TODO: make a query to Firebase
  };

  return (
    <>
      <h1>Stock History</h1>
      <div>
        <label htmlFor="stock-history-date">Select Date: </label>
        <input type="date" id="stock-history-date" onChange={handleDateChange} />
      </div>
      <p>Date selected: {date}</p>
      {stockLists && (
        <ul>
          {Object.keys(stockLists).map((stock, index) => (
            <li key={index}>{stockLists[stock]['label']}</li>
          ))}
        </ul>
      )}

      {stockLists && isObjectEmpty(stockLists) && <div>Stock not submited on this day</div>}
    </>
  );
}
