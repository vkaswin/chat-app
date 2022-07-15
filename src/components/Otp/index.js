import React, { useState } from "react";

import "./Otp.scss";

export const Otp = ({ inputBox, onChange, isAutoFocus }) => {
  let [otp, setOtp] = useState(Array(inputBox).fill(""));

  const handleChange = (e, index) => {
    let otpValue = otp;
    otpValue[index] = e.target.value;
    setOtp(otpValue);
    onChange(otpValue.join(""));
  };

  const handleKeyUp = (e, index) => {
    if (e.key === "Backspace") {
      let id = index - 1 < 0 ? 0 : index - 1;
      document.getElementById(id).select();
    } else if (index < inputBox - 1 && e.target.value !== "") {
      let id = index + 1 === inputBox ? inputBox - 1 : index + 1;
      document.getElementById(id).select();
    }
  };

  const handleClick = (index) => {
    document.getElementById(index).select();
  };

  return (
    <div className="container-lg">
      <div className="row">
        <div className="otp-container">
          {otp.map((_, index) => {
            return (
              <input
                key={index}
                id={index}
                type="tel"
                defaultValue={otp[index]}
                maxLength={1}
                autoFocus={isAutoFocus && index === 0 ? true : false}
                name={"digit" + index}
                onChange={(e) => handleChange(e, index)}
                onKeyUp={(e) => handleKeyUp(e, index)}
                onClick={(e) => handleClick(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
