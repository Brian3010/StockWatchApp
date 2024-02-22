import { ChangeEventHandler, useState } from 'react';
import CompressingIcon from '../../../components/CompressingIcon';
import UploadIcon from '../../../components/UploadIcon';
import { compressImageFile } from '../../../utils/helpers';

interface TaskImageItemProps {
  task: string;
  onChange: (file: File, id: string) => void;
}

export default function TaskImageItem({ task, onChange }: TaskImageItemProps) {
  const [picture, setPicture] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = async event => {
    if (!event.target.files || event.target.files.length === 0) return;

    try {
      setIsLoading(true);
      const { name: id } = event.target;
      const compressPic = await compressImageFile(event.target.files[0]);
      setPicture(URL.createObjectURL(compressPic));

      onChange(compressPic, id);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }

    // setPicture(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <label
      htmlFor={task}
      className="flex min-h-[210px] cursor-pointer items-center justify-evenly gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-2 hover:bg-gray-100"
    >
      {!isLoading && picture && (
        <div className="flex flex-1 items-center">
          <img className="max-h-full w-full rounded-md object-contain" src={picture} alt="image-task" />
        </div>
      )}
      {isLoading ? (
        <CompressingIcon />
      ) : (
        <>
          <div className="flex flex-1 flex-col items-center justify-center">
            <UploadIcon />
            <p className="text-center">
              <span className=" text-sm font-bold">{task}</span>
            </p>
            <p className="text-xs text-gray-500">Upload Here</p>
          </div>

          <input
            className="hidden"
            type="file"
            id={task}
            name={task}
            accept="image/*"
            capture="environment"
            onChange={handleOnChange}
            required
          />
        </>
      )}
    </label>
  );
}
