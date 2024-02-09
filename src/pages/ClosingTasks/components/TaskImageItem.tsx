import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import UploadIcon from '../../../components/UploadIcon';

interface TaskImageItemProps {
  task: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TaskImageItem({ task, onChange }: TaskImageItemProps) {
  const [picture, setPicture] = useState<string>();
  const handleOnChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.files || event.target.files.length === 0) return;
    onChange(event);
    setPicture(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <label
      htmlFor={task}
      className="flex  min-h-[210px] cursor-pointer items-center justify-evenly rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
    >
      {picture && (
        <div className="h-[85%] w-[120px] bg-blue-400 ">
          <img className="h-full w-full object-cover" src={picture} alt="image-task" />
        </div>
      )}
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
        id={task}
        name={task}
        accept="image/*"
        capture="environment"
        onChange={handleOnChange}
      />
    </label>
  );
}
