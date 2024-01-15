import { useState } from 'react';
import { Chicken_Inventory } from '../types/Chicken_Inventory';

const useChickenForm = () => {
  const [formData, setFormData] = useState<Chicken_Inventory>({
    whole_chicken: 0,
    boneless_chicken: 0,
    chicken_wings: 0,
  });
  //   console.log({ formData });

  return { formData, setFormData };
};

export default useChickenForm;
