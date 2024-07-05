import { DocumentData, getDocs } from 'firebase/firestore';
import { replaceUnderscore } from '../../utils/helpers';
import { collectionRef } from '../config';

// get stocklist by date
/* query to database with the selected date
  get stock list in both sauce and chicken inventory
  return them, if one or 2 of them don't exist, return undefined/empty
*/
export interface GetStockListsByDateT {
  [key: string]: DocumentData & { label: string; item_names: string[] };
}
export default function getStockListsByDate(date: string) {
  return new Promise<GetStockListsByDateT>((resolve, reject) => {
    (async () => {
      try {
        const snapShot = await getDocs(collectionRef);
        const docData: GetStockListsByDateT = {};

        snapShot.docs.forEach(doc => {
          const docId = doc.id;
          // console.log(doc.data());
          if (doc.data()[date]) {
            docData[docId] = {
              ...doc.data()[date],
              label: replaceUnderscore(docId),
              item_names: doc.data().item_names,
            };
          }
        });
        // console.log({ docData });
        return resolve(docData);
      } catch (error) {
        return reject(error);
      }
    })();
  });
}
