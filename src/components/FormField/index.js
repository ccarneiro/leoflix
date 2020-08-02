import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const FormFieldWrapper = styled.div`
  position: relative;
  textarea {
    min-height: 150px;
  }
  input[type='color'] {
    padding-left: 56px;
  }
`;

const Label = styled.label``;

Label.Text = styled.span`
  color: #e5e5e5;
  height: 57px;
  position: absolute;
  top: 0;
  left: 16px;

  display: flex;
  align-items: center;

  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;

  transition: 0.1s ease-in-out;
`;

const Input = styled.input`
  background: #53585d;
  color: #f5f5f5;
  display: block;
  width: 100%;
  height: 57px;
  font-size: 18px;

  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585d;

  padding: 16px 16px;
  margin-bottom: 45px;

  resize: none;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-bottom-color: var(--primary);
  }

  &:focus:not([type='color']) + span {
    transform: scale(0.6) translateY(-10px);
  }

  &:focus.error {
    border-bottom-color: red;
  }

  ${function notEmpty({ hasValue }) {
    return (
      hasValue
      && css`
        &:not([type='color']) + span {
          transform: scale(0.6) translateY(-10px);
        }
      `
    );
  }}
`;

const Error = styled.span`
  display: block;
  position: absolute;
  font-weight: bold;
  color: #ff0000;
  bottom: -24px;
  left: 16px;
`;

// eslint-disable-next-line
function FormField({ label, type, name, value, onChange, onBlur, suggestions, errors, showErrors }) {
  const fieldId = `id_${name}`;
  const listId = suggestions ? `${fieldId}-list` : null;

  // const Input = type === 'textarea' ? 'textarea' : 'input';
  const isTextarea = type === 'textarea';
  const tag = isTextarea ? 'textarea' : 'input';
  const hasValue = !!value.length;

  return (
    <>
      <FormFieldWrapper>
        <Label htmlFor={fieldId}>
          <Input
            as={tag}
            type={type}
            id={fieldId}
            value={value}
            name={name}
            hasValue={hasValue}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={listId ? 'off' : null}
            list={listId}
            className={((showErrors || {})[name]) && 'error'}
          />
          <Label.Text>{label}</Label.Text>
          {suggestions && (
            <>
              <datalist id={listId}>
                {
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                suggestions.map((valor) => (<option key={valor} value={valor} />))
                }
              </datalist>
            </>
          )}
          {(showErrors || {})[name] && <Error>{(errors || {})[name]}</Error>}
        </Label>
      </FormFieldWrapper>
    </>
  );
}
FormField.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
  onBlur: () => {},
  suggestions: null,
  errors: {},
  showErrors: {},
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  errors: PropTypes.objectOf(PropTypes.any),
  showErrors: PropTypes.objectOf(PropTypes.any),
  // errors: PropTypes.objectOf(PropTypes.object),
  // showErrors: PropTypes.objectOf(PropTypes.object),
};

export default FormField;
