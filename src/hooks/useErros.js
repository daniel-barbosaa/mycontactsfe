import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const errorEmailExists = errors.find(error => error.field === field);

    if (errorEmailExists) {
      return;
    }

    setErrors(prevState => [...prevState, { field, message }]);
  }

  function removeError(fieldName) {
    setErrors(prevState =>
      prevState.filter(error => error.field !== fieldName),
    );
  }

  function getErroMessageByFieldName(fieldName) {
    return errors.find(error => error.field === fieldName)?.message;
  }

  return { errors, setError, removeError, getErroMessageByFieldName };
}
