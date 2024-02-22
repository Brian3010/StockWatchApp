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

    // return () => {
    //   setFlashMessage({ message: '', type: 'error' });
    // };
  }, [flashMessage.message.length, setFlashMessage]);

  return (
    <>
      {flashMessage.message.length > 0 && (
        <div
          className={`absolute bottom-44 left-0 right-0 m-auto mb-4 w-max rounded-lg shadow-sm ${flashMessage.type === 'success' ? `bg-green-100 text-green-900` : 'bg-red-100 text-red-900'} p-4 text-sm`}
          role="alert"
        >
          <span className="text-base font-semibold">{flashMessage.message}</span>
        </div>
      )}
    </>
  );
}
