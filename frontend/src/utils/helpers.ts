import { DocumentData } from 'firebase/firestore';

export const replaceUnderscore = (string: string) => string.replace(/_/g, ' ');

// convert the documentData form firebase to Array and keep the key's order using array of keys
export const convertDocDataToArray = (data: DocumentData, keysArr: string[]) => {
  const fields: [string, number][] = [];
  // console.log(keysArr);
  for (let i = 0; i < Object.keys(data).length; i++) {
    fields.push([keysArr[i], data[keysArr[i]]]);
  }
  return fields;
};
