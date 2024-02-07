import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { GetStockListsByDateT } from '../../../firebase';
import { useHorizontalScroll } from '../../../hooks/useHorizontalScroll';
import TBodyRow from './TBodyRow';

interface StockTabsProps {
  stockLists: GetStockListsByDateT;
}

export default function StockTabs({ stockLists }: StockTabsProps) {
  const [scrollRef] = useHorizontalScroll();
  const [lowStockChecked, setLowStockChecked] = useState<boolean>(false);

  return (
    <>
      <div className="pb-3 text-right">
        <label htmlFor="stock-sorted-checkbox" className="me-2 inline-flex">
          <span className="me-1 h-3 w-3 self-center rounded-full bg-yellow-400"></span> <span>Low Stock</span>
        </label>
        <input
          type="checkbox"
          className="mr-2 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
          id="stock-sorted-checkbox"
          onChange={() => setLowStockChecked(!lowStockChecked)}
          checked={lowStockChecked}
        />
      </div>
      <Tab.Group>
        <div className="mb-1 overflow-hidden border-y border-gray-200">
          <Tab.List
            ref={scrollRef}
            className="scrollbar-hide -mb-px flex w-screen flex-nowrap gap-1 overflow-x-auto font-semibold"
          >
            {Object.keys(stockLists).map((stock, index) => (
              <Tab key={index} as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <button
                    className={`inline-block flex-shrink-0 cursor-grab border-b-2 p-3 hover:bg-gray-100 ${
                      selected ? 'border-blue-700 bg-white text-blue-700' : 'bg-white text-black'
                    }`}
                  >
                    {stockLists[stock]['label']}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels>
          {Object.keys(stockLists).map((stock, index) => (
            <Tab.Panel key={index}>
              <table className="min-w-full rounded-xl bg-white text-left">
                <thead className="border-b dark:border-neutral-500">
                  <tr className="bg-blue-gray-100 text-gray-700">
                    <th scope="col" className="px-4 py-3">
                      Name (unit)
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody className="text-blue-gray-900">
                  <TBodyRow
                    key={index}
                    itemNames={stockLists[stock].item_names}
                    stock={stockLists[stock]}
                    lowStockChecked={lowStockChecked}
                  />
                </tbody>
              </table>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
