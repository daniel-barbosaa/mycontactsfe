import { useCallback, useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(
    ({ field, message }) => {
      const errorEmailExists = errors.find(error => error.field === field);

      if (errorEmailExists) {
        return;
      }

      setErrors(prevState => [...prevState, { field, message }]);
    },
    [errors],
  );

  const removeError = useCallback(fieldName => {
    setErrors(prevState =>
      prevState.filter(error => error.field !== fieldName),
    );
  }, []);

  const getErroMessageByFieldName = useCallback(
    fieldName => {
      return errors.find(error => error.field === fieldName)?.message;
    },
    [errors],
  );

  return { errors, setError, removeError, getErroMessageByFieldName };
}
