import { TaskImagesByDateResT } from '../../../firebase';

interface TaskImageDisplayProps {
  taskNames: string[];
  taskImageList: TaskImagesByDateResT;
}
export default function TaskImageDisplay({ taskNames, taskImageList }: TaskImageDisplayProps) {
  return (
    <>
      <h1 className="border-b text-lg font-semibold">Completed Tasks</h1>
      <div className="grid gap-x-2 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 py-2">
        {taskNames.map((task, index) => (
          <div className="flex flex-col justify-between gap-1">
            <div id="card-task" key={index} className="flex grow flex-col justify-center">
              <div id="image-task" className="">
                <img loading="lazy" className="h-full w-full rounded-md object-contain" src={taskImageList[task]} />
              </div>
            </div>
            <div className="min-h-[50px] px-2">
              <p className="text-center font-semibold underline">{task}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
