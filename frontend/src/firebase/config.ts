import { FirebaseOptions, initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAeoNl9i1vfLZUgMLe--YYdFWEtLI5ZW5A',
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

// collection ref
export const collectionRef = collection(db, 'StockLists'); // provide types for return response

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
