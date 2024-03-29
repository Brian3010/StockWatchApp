import { FirebaseOptions, initializeApp } from 'firebase/app';
import { collection, doc, getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: 'stockwatch-c700e.firebaseapp.com',
  databaseURL: 'https://stockwatch-c700e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'stockwatch-c700e',
  storageBucket: 'stockwatch-c700e.appspot.com',
  messagingSenderId: '509442990209',
  appId: '1:509442990209:web:33372913f0abf478bfed80',
  measurementId: 'G-MSTYB5WWM6',
};

// init firebase app
const firebaseApp = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(firebaseApp);
// StockLists converter

// collection ref - StockLists
export const collectionRef = collection(db, 'StockLists'); // provide types for return response

export const documentRef = (docId: string) => doc(db, 'StockLists', docId);

// BOHTaskImages Ref
export const taskImagesRef = collection(db, 'BOHTaskImages');

// BOHTaskImages Storate Ref
const storage = getStorage();
export const taskImgStorageByDateRef = (date: string, id: string) => ref(storage, `BOH-tasks/${date}/${id}`);

export const taskImgStorageRef = (date: string) => ref(storage, `BOH-tasks/${date}`);

export const imageStorageRef = ref(storage, 'BOH-tasks');

// typescript with firebase: https://medium.com/javascript-in-plain-english/using-firestore-with-typescript-in-the-v9-sdk-cf36851bb099

// export const stockListsConverter = {
//   toFirestore(stockLists: StockLists): DocumentData {
//     return [
//       {
//         whole_chicken: stockLists[0].whole_chicken,
//         boneless_chicken: stockLists[0].boneless_chicken,
//       },
//       {
//         chicken_powder: stockLists[1].chicken_powder,
//       },
//     ];
//   },

//   fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): StockLists {
//     const data = snapshot.data(options)!;
//     return [
//       {
//         whole_chicken: data[0].whole_chicken,
//         boneless_chicken: data[0].boneless_chicken,
//       },
//       {
//         chicken_powder: data[1].chicken_powder,
//       },
//     ];
//   },
// };
