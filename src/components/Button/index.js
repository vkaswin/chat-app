import React from "react";

import "./Button.scss";

export const Button = ({
  label,
  className = "",
  onClick = () => {
    return null;
  },
  refs = null,
  disabled = false,
}) => {
  const btnClick = ({ pageX, pageY }) => {
    let offsetLeft = document.getElementById(label).offsetLeft;
    let offsetTop = document.getElementById(label).offsetTop;
    let ripple = document.createElement("span");
    document.getElementById(label).appendChild(ripple);
    ripple.className = "btn-ripple";
    ripple.style.left = `${pageX - offsetLeft}px`;
    ripple.style.top = `${pageY - offsetTop}px`;
    setTimeout(() => {
      ripple.remove();
    }, 1000);
    onClick();
  };

  return (
    <button
      ref={refs}
      id={label}
      onClick={btnClick}
      className={className}
      disabled={disabled}
    >
      <label dangerouslySetInnerHTML={{ __html: label }}></label>
    </button>
  );
};
