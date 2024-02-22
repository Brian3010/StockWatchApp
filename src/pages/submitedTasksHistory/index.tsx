import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../../components/Heading';
import IsLoading from '../../components/IsLoading';
import NoDataIcon from '../../components/NoDataIcon';
import { TaskImagesByDateResT, getBOHTasks, getTaskImagesByDate } from '../../firebase';
import TaskImageDisplay from './components/TaskImageDisplay';

export default function SubmitedTasksHistory() {
  const { DATE } = useParams();
  console.log({ DATE });
  const [taskImageList, setTaskImageList] = useState<TaskImagesByDateResT>({});
  const [taskNames, setTaskNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!DATE) return;

    (async () => {
      try {
        setIsLoading(true);
        const res = await getTaskImagesByDate(DATE);
        // console.log({ res });
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
          {Object.keys(taskImageList).length === 0 ? (
            <div className="flex flex-col items-center gap-2 pt-16">
              <NoDataIcon />
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
