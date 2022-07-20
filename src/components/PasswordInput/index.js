import React, { useState } from "react";
import PropTypes from "prop-types";

import "./PasswordInput.scss";

export const PasswordInput = ({
  label,
  placeholder,
  value,
  register,
  disabled,
  error,
  message,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="form-input">
      <label>{label}</label>
      <div className="password-input">
        <input
          type={isOpen ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          defaultValue={value}
          disabled={disabled}
          aria-invalid={error !== undefined ? true : false}
        />
        {isOpen ? (
          <i className="bxs-show" onClick={() => setIsOpen(false)}></i>
        ) : (
          <i className="bxs-hide" onClick={() => setIsOpen(true)}></i>
        )}
      </div>
      {error !== undefined && <span>{message[error.type]}</span>}
    </div>
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  message: PropTypes.object,
};

PasswordInput.defaultProps = {
  placeholder: "Enter here",
  disabled: false,
};
