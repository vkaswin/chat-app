import React from "react";

import "./CheckBox.scss";

export const CheckBox = ({
  label,
  name,
  value = "",
  onChange,
  checked,
  disabled = false,
}) => {
  return (
    <div className="custom-checkbox-wrapper">
      <div>
        <input
          type="checkbox"
          id={label}
          name={name}
          className="custom-checkbox"
          value={value}
          checked={checked}
          onChange={(e) => onChange(e)}
          disabled={disabled}
        />
      </div>
      <label htmlFor={label}>{label}</label>
    </div>
  );
};
