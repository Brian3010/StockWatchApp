import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { GetStockListsByDateT } from '../../../firebase';
import { excludeUnit, replaceUnderscore } from '../../../utils/helpers';

interface StockTabsProps {
  stockLists: GetStockListsByDateT;
}

export default function StockTabs({ stockLists }: StockTabsProps) {
  return (
    <Tab.Group>
      <div className="border-b border-gray-200 mb-1">
        <Tab.List className="flex flex-wrap -mb-px font-medium border-t">
          {Object.keys(stockLists).map((stock, index) => (
            <Tab key={index} as={Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={`inline-block p-2  border-b-2  hover:bg-gray-100 ${
                    selected ? 'bg-white text-blue-700 border-blue-700' : 'bg-white text-black'
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
            <table className="text-left min-w-full bg-white rounded-xl">
              <thead className="border-b dark:border-neutral-500">
                <tr className="bg-blue-gray-100 text-gray-700">
                  <th scope="col" className="py-3 px-4">
                    Item name (unit)
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Count
                  </th>
                </tr>
              </thead>
              <tbody className="text-blue-gray-900">
                {stockLists[stock[0]].item_names.map((item, index) => (
                  <tr className="border-b border-blue-gray-200" key={index}>
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
