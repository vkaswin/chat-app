import React from "react";

import "./Switch.scss";

export const Switch = ({
  label = "",
  name,
  checked,
  onChange,
  value = "",
  headColor = "#1976d2",
  barColor = "#86bce9",
  disabled = false,
  labelColor = "#5e5873",
}) => {
  return (
    <div
      className="custom-switch"
      style={{ "--switch-head": headColor, "--switch-bar": barColor }}
    >
      <input
        id={label.toLowerCase()}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor={label.toLowerCase()} style={{ color: labelColor }}>
        {label}
      </label>
    </div>
  );
};
