import { DocumentData, Timestamp, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, listAll, uploadBytes } from 'firebase/storage';
import { replaceUnderscore } from '../utils/helpers';
import { collectionRef, documentRef, taskImagesRef, taskImgStorageByDateRef, taskImgStorageRef } from './config';

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

// this function returns all subcollections as categories
export type getAllCategoriesT = { category: string; createdAt: string | undefined }[];

export const getAllCategories = () => {
  return new Promise<getAllCategoriesT>((resolve, reject) => {
    (async () => {
      try {
        const snapShot = await getDocs(collectionRef);
        const categories: getAllCategoriesT = [];
        await Promise.all(
          snapShot.docs.map(async doc => {
            // categories.push(doc.id);
            // console.log(doc.ref);
            const hasDoc = await hasTodayStockByCategory(doc.id);
            if (hasDoc) {
              categories.push({ category: doc.id, createdAt: formatTimeStamp(doc.data()[TODAY_DATE]['createdAt']) });
            } else {
              categories.push({ category: doc.id, createdAt: undefined });
            }
          }),
        );

        return resolve(categories);
      } catch (error) {
        return reject(error);
      }
    })();
  });
};

// this function get the stock cound list by catogory
export interface GetStockCountByCategoryT {
  yesterdayCount: DocumentData;
  itemNames: string[];
  todayCount?: { [key: string]: DocumentData };
}
export const getStockCountByCategory = (category: string) => {
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
};

// update stock by category/docId
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

// add new doc, named after date
/*  get today's date, use it as the doc's name
    get the doc with today's date as id
    update the doc
    //* updateDoc: if exists -> update doc, if not -> add new doc 
*/

export const updateOrAddStockCount = (docId: string, data: DocumentData) => {
  return new Promise<string | Error>((resolve, reject) => {
    const dataToSubmit = formatToFirebaseData(data, TODAY_DATE);

    (async () => {
      try {
        const docSnap = await getDoc(documentRef(docId));
        await updateDoc(docSnap.ref, dataToSubmit);
        return resolve('Success! Stock count has been recorded');
      } catch (error) {
        return reject(error);
      }
    })();
  });
};

// get stocklist by date
/* query to database with the selected date
  get stock list in both sauce and chicken inventory
  return them, if one or 2 of them don't exist, return undefined/empty
*/
export interface GetStockListsByDateT {
  [key: string]: DocumentData & { label: string; item_names: string[] };
}
export const getStockListsByDate = (date: string) => {
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
};

/**----------------------------------------------------------------------*/
/**
 * Calling BOHTaskImages APIs
 * */

export interface TgetBOHTasks {
  taskLists: string[];
}
export const getBOHTasks = () => {
  return new Promise<string[]>((resolve, reject) => {
    (async () => {
      try {
        const snapShot = await getDocs(taskImagesRef);
        const BOHTasks = snapShot.docs.map(doc => {
          return doc.data()['tasksList'];
        });
        return resolve(BOHTasks[0]);
      } catch (error) {
        return reject(error);
      }
    })();
  });
};

export type PicturesT = { id: string; picBlob: string; picFile: File }[];

export const uploadTaskImages = (pictures: PicturesT) => {
  return new Promise<string>((resolve, reject) => {
    (async () => {
      try {
        await Promise.all(
          pictures.map(async pic => {
            await uploadBytes(taskImgStorageByDateRef(TODAY_DATE, pic.id), pic.picFile);
          }),
        );

        return resolve('Successfully uploaded');
      } catch (error) {
        return reject(error);
      }
    })();
  });
};

// get all the task images with the Date given, return {"task":'url',...}
export type TaskImagesByDateResT = { [key: string]: string };
export const getTaskImagesByDate = (date: string) => {
  return new Promise<TaskImagesByDateResT>((resolve, reject) => {
    (async () => {
      try {
        // get all images
        const res = await listAll(taskImgStorageRef(date));
        const imgObj: TaskImagesByDateResT = {};

        await Promise.all(
          res.items.map(async it => {
            //get image urls
            const imgUrl = await getDownloadURL(it);
            // imgArr.push({ [it.name]: imgUrl });
            imgObj[it.name] = imgUrl;
          }),
        );

        return resolve(imgObj);
      } catch (error) {
        return reject(error);
      }
    })();
  });
};

// Function check if tasks uploaded for today's date
export const isTaskSubmitted = () => {
  return new Promise<boolean>((resolve, reject) => {
    (async () => {
      try {
        // get all images
        const res = await listAll(taskImgStorageRef(TODAY_DATE));
        return resolve(!!res.items.length);
      } catch (error) {
        return reject(error);
      }
    })();
  });
};
