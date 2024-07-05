import { DocumentData, Timestamp, getDoc } from 'firebase/firestore';
import { documentRef } from './config';

// this function get yesterday time in server, return '19 January 2024 at 03:57:19 UTC+11'
export const getYesterdayServerTime = () => {
  const yesterdayDate = new Date(Date.now() - 86400000);
  const serverTime = Timestamp.fromDate(yesterdayDate)
    .toDate()
    .toLocaleDateString('en-AU', { month: '2-digit', day: '2-digit', year: 'numeric' })
    .replace(/\//g, '-');

  // console.log({ serverTime });

  return serverTime;
};

//* Safari and chrome render the date differently, need to modify the options in toLocateDateString({month:'2-digit'}) to accommodate both browser
export const TODAY_DATE = new Date(Date.now())
  .toLocaleDateString('en-AU', { month: '2-digit', day: '2-digit', year: 'numeric', hour12: true })
  .replace(/\//g, '-');

export const YESTERDAY_DATE = getYesterdayServerTime();

// {key:number,...} to {todayDate: {key:number,...}}
export const formatToFirebaseData = (data: Record<string, string>, todayDate: string): DocumentData => {
  const dataToSubmit: DocumentData = {
    [todayDate]: Object.entries(data).reduce((obj, item) => Object.assign(obj, { [item[0]]: +item[1] }), {
      createdAt: Timestamp.now(),
    }),
  };
  // console.log({ dataToSubmit });
  return dataToSubmit;
};

export const formatTimeStamp = (time: Timestamp | undefined) => {
  if (!time) return undefined;
  const serverTime = time
    .toDate()
    .toLocaleString('en-AU', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

  return serverTime;
};

// check if stock of today has been submitted
export const hasTodayStockByCategory = (docId: string) => {
  return new Promise<boolean>((resolve, reject) => {
    (async () => {
      try {
        const docSnap = await getDoc(documentRef(docId));
        if (docSnap.exists()) {
          return resolve(Boolean(docSnap.data()[TODAY_DATE]));
        } else {
          throw new Error('Document not exist');
        }
      } catch (error) {
        return reject(error);
      }
    })();
  });
};

// // update stock by category/docId
// export const updateStockCount = async (docId: string, items: DocumentData) => {
//   return new Promise((resolve, reject) => {
//     (async () => {
//       try {
//         Object.entries(items).map(async it => {
//           await updateDoc(documentRef(docId), { [it[0]]: parseInt(it[1]) });
//           // console.log(it);
//           // await updateDoc(chickenDocRef(docId), {
//           //   createdAt: serverTimestamp(),
//           // });
//         });

//         return resolve('succesfully updated');
//       } catch (error) {
//         return reject(error);
//       }
//     })();
//   });
// };
