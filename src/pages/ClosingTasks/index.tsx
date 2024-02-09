import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import { TgetBOHTasks, getBOHTasks } from '../../firebase';
import TaskImagesUpload from './components/TaskImagesUpload';

export default function ClosingTasks() {
  const [tasksList, setTasksList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getBOHTasks();
        console.log(res);
        if (res) setTasksList(res);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex border-b p-4">
        <BackButton className="mr-auto" to="../" />
        <p className="mr-auto font-medium">BOH Closing tasks</p>
      </div>
      <div className="">
        <h1 className="border-b pb-3 pt-8 text-xl font-bold">List of tasks:</h1>

        {/** begin of the list */}
        <TaskImagesUpload tasksList={tasksList} />
        {/** end of list */}
      </div>
    </>
    //TODO: Watch this: https://www.youtube.com/watch?v=YOAeBSCkArA&ab_channel=PedroTech
  );
}
