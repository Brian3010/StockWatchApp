import { DocumentData, Timestamp, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { collectionRef, documentRef } from './config';

// get collection data
export interface StockListsData {
  data: DocumentData[];
  options: string[];
}
export const getStockListsV1 = () => {
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

// this function format the serverTimeStamp to DD-MM-YY
const formatServerTimeStamp = (time: Timestamp) => {
  const serverTime = time.toDate();
  const formattedDate = `${('0' + serverTime.getDate()).slice(-2)}-${('0' + (serverTime.getMonth() + 1)).slice(
    -2
  )}-${serverTime.getFullYear()}`;

  console.log({ formattedDate });
  return formattedDate; // DD-MM-YY;
};

// this function get yesterday time in server, return '19 January 2024 at 03:57:19 UTC+11'
const getYesterdayServerTime = () => {
  const yesterdayDate = new Date(Date.now() - 86400000);
  const serverTime = Timestamp.fromDate(yesterdayDate).toDate().toLocaleDateString().replace(/\//g, '-');

  // console.log({ serverTime });

  return serverTime;
};

// this function checks if yesterday stock is available
const hasYesterdayStock = () => {};

// this function gets the stockLists from database
interface GetStockListsResponse {
  itemNames: string[][];
  yesterdayStock: DocumentData[];
  options: string[];
}

export const getStockListsV2 = () => {
  return new Promise<GetStockListsResponse>((resolve, reject) => {
    (async () => {
      try {
        const stockSnapShot = await getDocs(collectionRef);

        const options: string[] = [];
        const itemNames: string[][] = [];
        const yesterdayStock: DocumentData[] = [];
        const yesterdayDate = getYesterdayServerTime();

        stockSnapShot.docs.map(doc => {
          console.log(doc.data());
          options.push(doc.id);
          itemNames.push(doc.data()['item_names']);
          //TODO: check if yesterday stock exists, if not returns empty DocumentData | Object
          //TODO: has a function to return the timestamp in format DD-MM-YYYY to place as key in doc.data()['formatedDate']
          yesterdayStock.push(doc.data()[yesterdayDate]);
          //* if the date not found, undefined will be assigned.

          // return doc.data();
        });
        // console.log(snapShot[0]); // [{chicken_inventory},{sauce_chicken}];

        // const convertedData = convertFirebaseData(snapShot);

        return resolve({ itemNames, options, yesterdayStock });
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
          await updateDoc(documentRef(docId), { [it[0]]: parseInt(it[1]) });
          // console.log(it);
          // await updateDoc(chickenDocRef(docId), {
          //   createdAt: serverTimestamp(),
          // });
        });

        return resolve('succesfully updated');
      } catch (error) {
        return reject(error);
      }
    })();
  });
};
