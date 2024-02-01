import { useEffect } from 'react';
import useFlashMessage from '../hooks/useFlashMessage';

export default function FlashMessage() {
  const { setFlashMessage, flashMessage } = useFlashMessage();

  //   console.log({ flashMessage });

  useEffect(() => {
    if (flashMessage.message.length > 0) {
      setTimeout(() => {
        setFlashMessage({ message: '', type: 'error' });
      }, 3000);
    }
  }, [flashMessage.message.length, setFlashMessage]);

  return (
    <>
      {flashMessage.message.length > 0 && (
        <div
          className={`absolute bottom-28 left-0 right-0 m-auto mb-4 w-max rounded-lg ${flashMessage.type === 'success' ? `bg-green-100 text-green-900` : 'bg-red-100 text-red-900'} p-4 text-sm`}
          role="alert"
        >
          <span className="font-medium">{flashMessage.message}</span>
        </div>
      )}
    </>
  );
}
