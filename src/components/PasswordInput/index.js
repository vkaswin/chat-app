import React, { useState } from "react";

import "./PasswordInput.scss";

export const PasswordInput = ({
  label,
  placeholder = "Enter here",
  value,
  register,
  disabled = false,
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
