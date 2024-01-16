import { DocumentData, getDocs, updateDoc } from 'firebase/firestore';
import { chickenDocRef, collectionRef } from './config';

// get collection data
export interface StockListsData {
  data: DocumentData[];
  options: string[];
}
export const getStockLists = () => {
  return new Promise<StockListsData>((resolve, reject) => {
    (async () => {
      try {
        const stockSnapShot = await getDocs(collectionRef);

        const docOptions: string[] = [];
        const snapShot = stockSnapShot.docs.map(doc => {
          docOptions.push(doc.id);
          return doc.data();
        });
        // console.log(snapShot[0]); // [{chicken_inventory},{sauce_chicken}];

        // const convertedData = convertFirebaseData(snapShot);

        return resolve({ data: snapShot, options: docOptions });
      } catch (error) {
        return reject(error);
      }
    })();
  });
};

export const ChickenInventoryFields = ['whole_chicken', 'boneless_chicken', 'chicken_wings'];
export const SauceInventoryFields = ['chicken_powder'];

export const updateStockCount = async (docId: string, items: DocumentData) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        Object.entries(items).map(async it => {
          await updateDoc(chickenDocRef(docId), { [it[0]]: parseInt(it[1]) });
          // console.log(it);
        });

        return resolve('succesfully updated');
      } catch (error) {
        return reject(error);
      }
    })();
  });
};
