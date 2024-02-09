import { ChangeEventHandler, useState } from 'react';
import UploadIcon from '../../../components/UploadIcon';

interface TaskImagesUploadProps {
  tasksList: string[];
}

export default function TaskImagesUpload({ tasksList }: TaskImagesUploadProps) {
  const [pictures, setPictures] = useState<{ id: string; taskPics: File; displayPics: string }[]>([]);
  // const [picsDisplay, setPicsDisplay]
  console.log({ pictures });
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.files) return;
    //TODO: find a way to check if pic already exists in the state, then return
    //TODO: once done, display preview image on the side, and allow to delete preview
    const newPic = {
      id: event.target.name,
      taskPics: event.target.files[0],
      displayPics: URL.createObjectURL(event.target.files[0]),
    };
    if (pictures.includes(newPic)) return;

    setPictures([...pictures, newPic]);
  };
  return (
    <div className="xl:scrollbar-hide xl:h-[670px] xl:overflow-scroll">
      <div className="mx-auto grid grid-cols-1 gap-2 border-b p-1 py-3 md:grid-cols-2">
        {tasksList.map((task, index) => (
          <label
            key={index}
            htmlFor="picture"
            className="flex  min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <UploadIcon />
              <p className="">
                <span className="font-semibold">{task}</span>
              </p>
              <p className="text-xs text-gray-500 ">Upload Here</p>
            </div>

            <input
              className="hidden"
              type="file"
              id="picture"
              name={task}
              accept="image/*"
              capture="environment"
              onChange={handleOnChange}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
