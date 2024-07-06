import { DocumentData, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { documentRef } from '../config';

export default function updateFrontStock(docId: string, data: DocumentData) {
  console.log({ docId, data });

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const docSnap = await getDoc(documentRef(docId));
        await updateDoc(docSnap.ref, { default: { ...data, createdAt: Timestamp.now() } });
        return resolve('Success! Stock count has been recorded');
      } catch (error) {
        return reject(error);
      }
    })();
  });
}
