import BackButton from '../../components/BackButton';
import TaskImagesUpload from './components/TaskImagesUpload';

export default function ClosingTasks() {
  return (
    <>
      <div className="flex border-b p-4">
        <BackButton className="mr-auto" to="../" />
        <p className="mr-auto font-medium">BOH Closing tasks</p>
      </div>
      <div className="">
        <h1 className="pb-3 pt-8 text-xl font-bold border-b">List of tasks:</h1>

        {/** begin of the list */}
        <TaskImagesUpload />
        {/** end of list */}
      </div>
    </>
    //TODO: Watch this: https://www.youtube.com/watch?v=YOAeBSCkArA&ab_channel=PedroTech
  );
}
