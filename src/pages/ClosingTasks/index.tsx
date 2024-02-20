import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton';
import IsLoading from '../../components/IsLoading';
import { getBOHTasks } from '../../firebase';
import TaskImagesUpload from './components/TaskImagesUpload';

export default function ClosingTasks() {
  const [tasksList, setTasksList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getBOHTasks();
        console.log({res});
        if (res) setTasksList(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex border-b p-4">
        <BackButton className="mr-auto" to="/boh-closing-tasks-menu" />
        <p className="mr-auto text-lg font-bold">BOH Checklist</p>
      </div>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="">
          <h1 className="border-b pt-8 text-lg font-semibold">Complete the following tasks:</h1>

          {/** begin of the list */}
          <TaskImagesUpload tasksList={tasksList} />
          {/** end of list */}
        </div>
      )}
    </>
  );
}
