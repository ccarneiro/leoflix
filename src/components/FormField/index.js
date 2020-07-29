import React from "react";

function FormField({ label, type, name, value, onChange }) {
  return (
    <>
      <div>
        <label>
          {label}
          {type === "textarea" && (
            <textarea
              type="text"
              value={value}
              name={name}
              onChange={onChange}
            />
          )}
          {type !== "textarea" && (
            <input type={type} value={value} name={name} onChange={onChange} />
          )}
        </label>
      </div>
    </>
  );
}

export default FormField;
