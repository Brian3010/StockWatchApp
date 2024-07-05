import { DocumentData, getDoc, updateDoc } from 'firebase/firestore';
import { documentRef } from '../config';
import { formatToFirebaseData, TODAY_DATE } from '../utils';

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
