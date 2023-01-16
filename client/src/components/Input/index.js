import React, { Fragment } from "react";

import "./Input.scss";

export const Input = ({
  label,
  type = "text",
  placeholder = "Enter here",
  register,
  value,
  maxLength = null,
  isReadOnly = false,
  disabled = false,
  error,
  message,
}) => {
  return (
    <div className="form-input">
      {!isReadOnly ? (
        <Fragment>
          <label>{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            {...register}
            defaultValue={value}
            maxLength={maxLength}
            disabled={disabled}
            aria-invalid={error !== undefined ? true : false}
          />
        </Fragment>
      ) : (
        <span>{value}</span>
      )}
      {error !== undefined && <span>{message[error.type]}</span>}
    </div>
  );
};
