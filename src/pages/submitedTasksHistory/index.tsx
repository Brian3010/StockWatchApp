import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../../components/Heading';
import IsLoading from '../../components/IsLoading';
import { TaskImagesByDateResT, getBOHTasks, getTaskImagesByDate } from '../../firebase';
import TaskImageDisplay from './components/TaskImageDisplay';

export default function SubmitedTasksHistory() {
  const { DATE } = useParams();
  console.log({ DATE });
  const [taskImageList, setTaskImageList] = useState<TaskImagesByDateResT>({});
  const [taskNames, setTaskNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!DATE) return;

    (async () => {
      try {
        setIsLoading(true);
        const res = await getTaskImagesByDate(DATE);
        console.log({ res });
        setTaskNames(await getBOHTasks());
        setTaskImageList(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [DATE]);

  return (
    <>
      <Heading to="/boh-closing-tasks-menu" headerName="Upload history" />

      {/** Content */}
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="xl:scrollbar-hide mb-3 pt-10 xl:h-[750px] xl:overflow-scroll">
          {Object.keys(taskImageList).length <= 0 ? (
            <div className="flex flex-col items-center gap-2 pt-16">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                <path
                  fillRule="evenodd"
                  d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-md font-semibold">Data unavailable due to incomplete tasks</p>
            </div>
          ) : (
            <TaskImageDisplay taskNames={taskNames} taskImageList={taskImageList} />
          )}
        </div>
      )}

      {/** ===========*/}
    </>
  );
}
