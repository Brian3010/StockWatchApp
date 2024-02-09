import { ChangeEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskImageItem from './TaskImageItem';

interface TaskImagesUploadProps {
  tasksList: string[];
}
//{id:['Fryer 1', 'Fryer 2','Fryer 3'], }
export default function TaskImagesUpload({ tasksList }: TaskImagesUploadProps) {
  const [pictures, setPictures] = useState<{ id: string; picBlob: string }[]>([]);

  // console.log({ pictures });
  console.log({ pictures });
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    // console.log(event.target.files);
    if (!event.target.files || event.target.files.length === 0) return;
    const { name } = event.target;

    const blob = URL.createObjectURL(event.target.files[0]);
    const newPic = { id: name, picBlob: blob };

    // setPictures(prev => [...prev, newPic]);
    setPictures(prev => {
      // remove pic if exist in the array
      // if not keep as is
      const filteredPic = prev.filter(pic => {
        return pic.id !== newPic.id;
      });
      return [...filteredPic, newPic];
    });
  };

  const handleSubmit = () => {
    
  }

  return (
    <div className="xl:scrollbar-hide xl:h-[670px] xl:overflow-scroll">
      <div className="mx-auto grid grid-cols-1 gap-2 border-b p-1 py-3 md:grid-cols-2">
        {tasksList.map((task, index) => (
          <TaskImageItem key={index} onChange={handleOnChange} task={task} />
        ))}
      </div>
      <div className="mt-16 flex justify-around">
        <Link to=".." className="rounded px-4  py-2 font-semibold underline hover:bg-gray-200">
          Cancel
        </Link>
        <button
          className="rounded  bg-gami-primary px-4 py-2 font-bold text-gami-text hover:brightness-90"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
