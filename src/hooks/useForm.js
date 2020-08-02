import { useState, useEffect } from 'react';

function useForm({ initialValues, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (validate && typeof validate !== 'function') {
    throw new Error('Validation tem que ser uma função.');
  }

  useEffect(() => {
    if (validate) {
      const err = validate(values);
      setErrors(err || ({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    const showErrosObj = {};
    if (errors) {
      Object.keys(errors).forEach((key) => {
        if (errors[key] && touched[key]) {
          showErrosObj[key] = true;
        }
      });
    }
    setShowErrors(showErrosObj);
  }, [errors, touched]);

  function setValue(nome, valor) {
    setValues({ ...values, [nome]: valor });
  }

  function handleChange({ target }) {
    setValue(target.getAttribute('name'), target.value);
  }

  function handleBlur({ target }) {
    const touchedObj = {
      ...touched,
      [target.getAttribute('name')]: true,
    };
    setTouched(touchedObj);
  }

  function clearForm() {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  }

  function markTouched() {
    const touchedObj = {};
    if (errors) {
      Object.keys(errors).forEach((key) => {
        touchedObj[key] = true;
      });
      setTouched(touchedObj);
    }
  }

  return {
    values,
    errors,
    showErrors,
    handleChange,
    handleBlur,
    clearForm,
    markTouched,
  };
}

export default useForm;
