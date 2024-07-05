import { getDocs } from "firebase/firestore";
import { taskImagesRef } from "../config";

export interface TgetBOHTasks {
  taskLists: string[];
}
export function getBOHTasks () {
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
}