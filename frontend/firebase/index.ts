import { getDocs } from 'firebase/firestore';

import { Chicken_Inventory } from '../@types/Chicken_Inventory';
import { StockLists } from '../@types/StockLists';
import { collectionRef } from './config';
import { Sauce_Inventory } from '../@types/Sauce_inventory';

// get collection data
export const getStockLists = () => {
  // getDocs(collectionRef);

  return new Promise<StockLists>((resolve, reject) => {
    (async () => {
      try {
        const stockSnapShot = await getDocs(collectionRef);

        const snapshot = stockSnapShot.docs.map(doc => {
          return doc.data();
        });
        console.log(snapshot); // [{},{}];

        const stockLists:StockLists = { Chicken_Inventory:snapshot[0] as Chicken_Inventory,Sauce_Inventory:snapshot[1] as Sauce_Inventory}
        console.log(stockLists);

        return resolve(stockLists);
      } catch (error) {
        return reject(error);
      }
    })();
  });
};
