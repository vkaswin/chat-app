import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./Input.scss";

export const Input = ({
  label,
  type,
  placeholder,
  register,
  value,
  maxLength,
  isReadOnly,
  disabled,
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

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "number"]),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxLength: PropTypes.number,
  isReadOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  message: PropTypes.object,
};

Input.defaultProps = {
  type: "text",
  placeholder: "Enter here",
  maxLength: null,
  isReadOnly: false,
  disabled: false,
};
