import React from "react";

import "./CheckBox.scss";

export const CheckBox = ({
  label,
  name,
  value = "",
  onChange,
  checked,
  disabled = false,
  color = "#7367f0",
  labelColor = "#5e5873",
}) => {
  return (
    <div className="custom-checkbox-wrapper">
      <div style={{ "--checkbox-color": color }}>
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
      <label htmlFor={label} style={{ color: labelColor }}>
        {label}
      </label>
    </div>
  );
};
