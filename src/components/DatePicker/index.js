import React, { useState, useMemo, useRef } from "react";
import { classNames, clickOutside } from "utils";
import PropTypes from "prop-types";

import "./DatePicker.scss";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const todayDate = new Date().toISOString().split("T")[0];

export const DatePicker = ({ placeholder, name, value, onChange }) => {
  const [date, setDate] = useState(new Date());

  const [isOpen, setIsOpen] = useState(false);

  const datePickerRef = useRef();

  const handleNext = () => {
    if (date.getMonth() === 11) {
      setDate(
        new Date(new Date(date.setMonth(0)).setFullYear(date.getFullYear() + 1))
      );
    } else {
      setDate(new Date(date.setMonth(date.getMonth() + 1)));
    }
  };

  const handleBack = () => {
    if (date.getMonth() === 0) {
      setDate(
        new Date(
          new Date(date.setMonth(11)).setFullYear(date.getFullYear() - 1)
        )
      );
    } else {
      setDate(new Date(date.setMonth(date.getMonth() - 1)));
    }
  };

  const handleSelect = (value) => () => {
    onChange({ name, value });
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const dates = useMemo(() => {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const dates = [];

    for (let i = 1; i < daysInMonth; i++) {
      dates.push(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(i).padStart(2, "0")}`
      );
    }

    return dates;
  }, [date]);

  const handleFocus = () => {
    setIsOpen(true);
    clickOutside({
      ref: datePickerRef.current,
      onClose: () => setIsOpen(false),
    });
  };

  return (
    <div ref={datePickerRef} className="rc-date-picker-container">
      <input
        type="text"
        placeholder={placeholder}
        value={String(value).replaceAll("-", "/")}
        onFocus={handleFocus}
        readOnly
      />
      {isOpen && (
        <div className="rc-date-picker">
          <div className="rc-date-picker-month">
            <div className="rc-date-picker-month-icon" onClick={handleBack}>
              <i className="fas fa-chevron-left"></i>
            </div>
            <div>
              <b>
                {monthNames[date.getMonth()]} {date.getFullYear()}
              </b>
            </div>
            <div className="rc-date-picker-month-icon" onClick={handleNext}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
          <div className="rc-date-picker-weeks">
            {dayNames.map((day, index) => {
              return <b key={index}>{day}</b>;
            })}
          </div>
          <div className="rc-date-picker-days">
            {dates.map((list, index) => {
              return (
                <span
                  key={index}
                  className={classNames({
                    highlight: list == todayDate,
                    active: list == value,
                  })}
                  onClick={handleSelect(list)}
                >
                  {index + 1}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

DatePicker.defaultProps = {
  placeholder: "Select Date",
  value: "",
  name: null,
  onChange: () => {},
};
