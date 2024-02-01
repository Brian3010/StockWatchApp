import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { GetStockListsByDateT } from '../../../firebase';
import { useHorizontalScroll } from '../../../hooks/useHorizontalScroll';
import { excludeUnit, replaceUnderscore } from '../../../utils/helpers';

interface StockTabsProps {
  stockLists: GetStockListsByDateT;
}

export default function StockTabs({ stockLists }: StockTabsProps) {
  const [scrollRef] = useHorizontalScroll();

  return (
    <Tab.Group>
      <div className="mb-1 overflow-hidden border-y border-gray-200">
        <Tab.List
          ref={scrollRef}
          className="scrollbar-hide -mb-px flex w-screen flex-nowrap gap-1 overflow-x-auto font-medium"
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
        {Object.entries(stockLists).map((stock, index) => (
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
                {stockLists[stock[0]].item_names.map((item, index) => (
                  <tr className="border-blue-gray-200 border-b" key={index}>
                    <td className="px-4 py-3">{replaceUnderscore(item)}</td>
                    <td className="px-4 py-3">{stockLists[stock[0]][excludeUnit(item)]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
