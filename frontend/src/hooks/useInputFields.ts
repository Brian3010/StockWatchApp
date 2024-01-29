import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';

const  useInputFields = () => {
  const [formInputs, setFormInputs] = useState<DocumentData>();
  //   console.log({ formData });

  return { formInputs, setFormInputs };
};

export default  useInputFields;
