import { getDocs } from 'firebase/firestore';
import { collectionRef } from '../config';
import { formatTimeStamp, hasTodayStockByCategory, TODAY_DATE } from '../utils';

// this function returns all subcollections as categories
export type getAllCategoriesT = { category: string; createdAt: string | undefined }[];

export default function getBohCategories() {
  return new Promise<getAllCategoriesT>((resolve, reject) => {
    (async () => {
      try {
        const snapShot = await getDocs(collectionRef);
        const categories: getAllCategoriesT = [];
        await Promise.all(
          snapShot.docs.map(async doc => {
            // categories.push(doc.id);
            if (!doc.id.includes('Front List')) {
              // console.log(doc.ref);
              const hasDoc = await hasTodayStockByCategory(doc.id);
              if (hasDoc) {
                categories.push({ category: doc.id, createdAt: formatTimeStamp(doc.data()[TODAY_DATE]['createdAt']) });
              } else {
                categories.push({ category: doc.id, createdAt: undefined });
              }
            }
          }),
        );

        return resolve(categories);
      } catch (error) {
        return reject(error);
      }
    })();
  });
}
