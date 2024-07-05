import { getDownloadURL, listAll } from 'firebase/storage';
import { taskImgStorageRef } from '../config';

// get all the task images with the Date given, return {"task":'url',...}
export type TaskImagesByDateResT = { [key: string]: string };
export function getTaskImagesByDate(date: string) {
  return new Promise<TaskImagesByDateResT>((resolve, reject) => {
    (async () => {
      try {
        // get all images
        const res = await listAll(taskImgStorageRef(date));
        const imgObj: TaskImagesByDateResT = {};

        await Promise.all(
          res.items.map(async it => {
            //get image urls
            const imgUrl = await getDownloadURL(it);
            // imgArr.push({ [it.name]: imgUrl });
            imgObj[it.name] = imgUrl;
          }),
        );

        return resolve(imgObj);
      } catch (error) {
        return reject(error);
      }
    })();
  });
}
