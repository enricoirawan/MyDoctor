import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useForm = (initialValue) => {
  const [values, setValues] = useState(initialValue);
  return [values, (formType, formValue) => {
    if (formType === 'reset') {
      return setValues(initialValue);
    }
    return setValues({ ...values, [formType]: formValue });
  },
  ];
};
