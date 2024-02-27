import imageCompression, { Options } from 'browser-image-compression';
import { DocumentData } from 'firebase/firestore';

export const replaceUnderscore = (string: string) => string.replace(/_/g, ' ');

export const excludeUnit = (string: string) => string.replace(/\([^)]*\)/g, '').trim();

// convert the documentData form firebase to Array and keep the key's order using array of keys
export const convertDocDataToArray = (data: DocumentData, keysArr: string[]) => {
  const fields: [string, number][] = [];
  // console.log(keysArr);
  for (let i = 0; i < Object.keys(data).length; i++) {
    fields.push([keysArr[i], data[keysArr[i]]]);
  }
  return fields;
};

export const isObjectEmpty = (obj: object) => Object.keys(obj).length === 0;

/* make sure the values are all string in order for the function to work correctly.
      - check formInputs undefined
      - check all inputs has been filled by comparing the length of itemNames and formInputs keys
      - check if all inputs has been filled but some of them are empty values,
*/
export const validateStockFormInputs = (formInput: DocumentData | undefined, itemNames: string[]): boolean => {
  if (!formInput) {
    console.log('formInput false');
    return false;
  }

  if (Object.keys(formInput).length !== itemNames.length) {
    console.log('checkLength false');
    return false;
  }

  if (!Object.values(formInput).every(value => value)) {
    console.log('checkLength false');
    return false;
  }

  return true;
};

// this func compress a list of images
// export const compressImageFiles = (files: File[]) => {
//   const options: Options = {
//     maxSizeMB: 0.2,
//   };
//   const compressFileList: File[] = [];
//   try {
//     Promise.all(
//       files.map(async f => {
//         const compressFile = await imageCompression(f, options);
//         compressFileList.push(compressFile);
//       }),
//     );

//     console.log({ compressFileList });
//   } catch (error) {
//     console.error('Compressing errors caught: ', error);
//   }
// };

export const compressImageFile = (file: File) => {
  const options: Options = {
    maxSizeMB: 0.1,
  };
  return new Promise<File>((resolve, reject) => {
    (async () => {
      try {
        const compressFile = await imageCompression(file, options);
        return resolve(compressFile);
      } catch (error) {
        return reject(error);
      }
    })();
  });
};

export const getCurrentTime = () => {
  const currentDate = new Date().toLocaleString('en-AU', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true, // Use 12-hour clock
  });
  return currentDate;
};
