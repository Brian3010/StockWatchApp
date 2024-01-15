import { getDocs, updateDoc } from 'firebase/firestore';

import { Chicken_Inventory } from '../types/Chicken_Inventory';
import { Sauce_Inventory } from '../types/Sauce_Inventory';
import { StockLists } from '../types/StockLists';
import { chickenDocRef, collectionRef } from './config';

// get collection data
export const getStockLists = () => {
  return new Promise<StockLists>((resolve, reject) => {
    (async () => {
      try {
        const stockSnapShot = await getDocs(collectionRef);

        const snapshot = stockSnapShot.docs.map(doc => {
          // console.log(doc);
          return doc.data();
        });
        console.log(snapshot); // [{},{}];

        const stockLists: StockLists = {
          Chicken_Inventory: snapshot[0] as Chicken_Inventory,
          Sauce_Inventory: snapshot[1] as Sauce_Inventory,
        };
        // console.log(stockLists);

        return resolve(stockLists);
      } catch (error) {
        return reject(error);
      }
    })();
  });
};

export const updateChickenStockCount = async (items: Chicken_Inventory) => {
  try {
    Object.entries(items).map(async it => {
      await updateDoc(chickenDocRef, { [it[0]]: parseInt(it[1]) });
      // console.log(it);
    });

    // const res = await updateDoc(chickenDocRef, { [item]: count });
    // console.log({ res });
  } catch (error) {
    console.error('error: ', error);
  }
};
