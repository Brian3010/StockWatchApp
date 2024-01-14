import { Chicken_Inventory } from '../types/Chicken_Inventory';
import { Sauce_Inventory } from '../types/Sauce_Inventory';
import { StockLists } from '../types/StockLists';

export const replaceUnderscore = (string: string) => string.replace(/_/g, ' ');

// convert {...{key:value}} to [...[key:value]]
export const convertChickenStockToArray = (obj: StockLists['Chicken_Inventory']) => {
  const list: [string, number][] = [];

  const chickenStockKeys: Array<keyof Chicken_Inventory> = ['whole_chicken', 'boneless_chicken', 'chicken_wings'];

  // for (const [key, value] of Object.entries(obj)) {
  //   list.push([key, value]);
  // }

  for (let i = 0; i < chickenStockKeys.length; i++) {
    list.push([chickenStockKeys[i], obj[chickenStockKeys[i]]]);
  }

  // console.log({ list });
  return list;
};

export const convertSauceStockToArray = (obj: StockLists['Sauce_Inventory']) => {
  const list: [string, number][] = [];

  const chickenStockKeys: Array<keyof Sauce_Inventory> = ['chicken_powder'];

  // for (const [key, value] of Object.entries(obj)) {
  //   list.push([key, value]);
  // }

  for (let i = 0; i < Object.keys(obj).length; i++) {
    list.push([chickenStockKeys[i], obj[chickenStockKeys[i]]]);
  }

  // console.log({ list });
  return list;
};
