import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompressingIcon from '../../../components/CompressingIcon';
import { PicturesT, uploadTaskImages } from '../../../firebase/uploadTasks/uploadTaskImages';
import useFlashMessage from '../../../hooks/useFlashMessage';
import TaskImageItem from './TaskImageItem';

interface TaskImagesUploadProps {
  tasksList: string[];
}
//{id:['Fryer 1', 'Fryer 2','Fryer 3'], }

const isValidInput = (inputs: PicturesT, tasksList: string[]) => {
  const inputIds = inputs.map(input => input.id);

  return inputIds.length === tasksList.length;
};

export default function TaskImagesUpload({ tasksList }: TaskImagesUploadProps) {
  const [pictures, setPictures] = useState<PicturesT>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  // console.log({ pictures, tasksList });
  const handleOnChange = (file: File, id: string) => {
    // console.log(event.target.files[0]);

    const blob = URL.createObjectURL(file);
    const newPic = { id: id, picBlob: blob, picFile: file };

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

  const handleSubmit = async () => {
    console.log({ pictures });
    if (!isValidInput(pictures, tasksList)) return alert('Please complete all the tasks assigned');

    try {
      setIsLoading(true);
      const res = await uploadTaskImages(pictures);
      // console.log(res);
      setIsLoading(false);
      setFlashMessage({ message: res.toString(), type: 'success' });
      return navigate('..', { relative: 'path' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="xl:scrollbar-hide xl:h-[670px] xl:overflow-scroll">
      <div className="mx-auto grid grid-cols-1 gap-2 border-b p-1 py-3 md:grid-cols-2 xl:grid-cols-1">
        {tasksList.map((task, index) => (
          <TaskImageItem key={index} onChange={handleOnChange} task={task} />
        ))}
      </div>
      <div className="mt-16 flex justify-around">
        <Link to=".." relative="path" className="rounded px-4  py-2 font-semibold underline hover:bg-gray-200">
          Cancel
        </Link>

        {isValidInput(pictures, tasksList) ? (
          <button
            className="rounded bg-gami-primary px-4 py-2 font-bold text-gami-text hover:brightness-90"
            type="submit"
            onClick={handleSubmit}
          >
            {isLoading ? <CompressingIcon /> : 'Submit'}
          </button>
        ) : (
          <button className="cursor-not-allowed rounded bg-gray-300 px-4 py-2 font-bold opacity-50" disabled>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
