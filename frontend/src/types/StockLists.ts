import { Chicken_Inventory } from './Chicken_Inventory';
import { Sauce_Inventory } from './Sauce_Inventory';

// export type StockLists = [Chicken_Inventory, Sauce_Inventory];
// export type StockLists = Chicken_Inventory | Sauce_Inventory;

// export type StockLists = (Chicken_Inventory | Sauce_Inventory)[];

export type  StockLists ={
  Chicken_Inventory: Chicken_Inventory;
  Sauce_Inventory: Sauce_Inventory;
}

