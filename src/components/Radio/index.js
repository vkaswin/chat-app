import React from "react";

import "./Radio.scss";

export const Radio = ({
  label,
  name,
  value = "",
  checked,
  onChange,
  disabled = false,
  color = "#7367f0",
  labelColor = "#5e5873",
}) => {
  return (
    <div className="custom-radio-wrapper">
      <div style={{ "--radio-color": color }}>
        <input
          className="custom-radio"
          type="radio"
          id={label}
          name={name}
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
