import { DocumentData, getDoc } from 'firebase/firestore';
import { documentRef } from '../config';
import { getYesterdayServerTime, TODAY_DATE } from '../utils';

// this function get the stock cound list by catogory
export interface GetStockCountByCategoryT {
  yesterdayCount: DocumentData;
  itemNames: string[];
  todayCount?: { [key: string]: DocumentData };
}
export default function getStockCountByCategory(category: string) {
  return new Promise<GetStockCountByCategoryT>((resolve, reject) => {
    (async () => {
      const yesterdayDate = getYesterdayServerTime();
      try {
        const docSnap = await getDoc(documentRef(category));

        if (docSnap.exists()) {
          // if there is stock today return it
          if (docSnap.data()[TODAY_DATE]) {
            // createAt causes unmatch length in the validating input process -> delete it
            const todayStock = docSnap.data()[TODAY_DATE];
            delete todayStock['createdAt'];

            return resolve({
              yesterdayCount: docSnap.data()[yesterdayDate],
              itemNames: docSnap.data().item_names,
              todayCount: todayStock,
            });
          }
          // return the stock yesterday regardless
          return resolve({ yesterdayCount: docSnap.data()[yesterdayDate], itemNames: docSnap.data().item_names });
          // return resolve({ yesterdayCount: docSnap.data()['18-01-2024'], itemNames: docSnap.data().item_names });
        } else {
          throw new Error(`data from getDoc(${category}) not exist`);
        }
      } catch (error) {
        return reject(error);
      }
    })();
  });
}
