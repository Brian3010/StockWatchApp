import { listAll } from 'firebase/storage';
import { taskImgStorageRef } from '../config';
import { TODAY_DATE } from '../utils';

// Function check if tasks uploaded for today's date
export const isTaskSubmitted = () => {
  return new Promise<boolean>((resolve, reject) => {
    (async () => {
      try {
        // get all images
        const res = await listAll(taskImgStorageRef(TODAY_DATE));
        return resolve(!!res.items.length);
      } catch (error) {
        return reject(error);
      }
    })();
  });
};
