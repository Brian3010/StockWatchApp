import { ReactElement, createContext, useState } from 'react';

interface FlashMessageT {
  message: string;
  type: 'error' | 'success';
}

export interface FlashMessageContextT {
  flashMessage: FlashMessageT;
  setFlashMessage: React.Dispatch<React.SetStateAction<FlashMessageT>>;
}
export const FlashMessageContext = createContext<FlashMessageContextT | undefined>(undefined);

export const FlashMessageProvider = ({ children }: { children: ReactElement }) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessageContextT['flashMessage']>({
    type: 'error',
    message: '',
  });

  return (
    <FlashMessageContext.Provider value={{ flashMessage, setFlashMessage }}>{children}</FlashMessageContext.Provider>
  );
};

export default FlashMessageContext;
