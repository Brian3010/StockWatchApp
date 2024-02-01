import { useContext } from 'react';
import FlashMessageContext, { FlashMessageContextT } from '../context/FlashMessageProvider';

const useFlashMessage = () => {
  return useContext(FlashMessageContext) as FlashMessageContextT;
};

export default useFlashMessage;
