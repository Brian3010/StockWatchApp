import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';

const  useInputFields = () => {
  const [inputData, setInputData] = useState<DocumentData>();
  //   console.log({ formData });

  return { inputData, setInputData };
};

export default  useInputFields;
