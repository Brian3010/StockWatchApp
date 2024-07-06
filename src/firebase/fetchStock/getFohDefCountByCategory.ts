import { DocumentData, getDoc } from 'firebase/firestore';
import { documentRef } from '../config';

export default function getFohDefCountByCategory(category: string) {
  return new Promise<DocumentData>((resolve, reject) => {
    (async () => {
      try {
        const docSnap = await getDoc(documentRef(category));
        if (docSnap.exists()) {
          console.log(docSnap.data()['default']);

          return resolve(docSnap.data()['default']);
        } else {
          throw new Error(`data from getDoc(${category}) not exist`);
        }
      } catch (error) {
        return reject(error);
      }
    })();
  });
}
