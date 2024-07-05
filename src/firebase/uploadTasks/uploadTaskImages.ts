import { uploadBytes } from 'firebase/storage';
import { taskImgStorageByDateRef } from '../config';
import { TODAY_DATE } from '../utils';

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
