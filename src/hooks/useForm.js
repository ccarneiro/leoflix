import { useState } from 'react';

function useForm(initialValue) {
  const [values, setValues] = useState(initialValue);

  function setValue(nome, valor) {
    setValues({ ...values, [nome]: valor });
  }

  function handleChange({ target }) {
    setValue(target.getAttribute('name'), target.value);
  }

  function clearForm() {
    setValues(initialValue);
  }

  return {
    values,
    handleChange,
    clearForm,
  };
}

export default useForm;
