import React, { useState } from "react";

import "./MultiSelect.scss";

export const MultiSelect = ({
  options = [],
  selectedOptions = [],
  onChange,
  placeholder = "Enter Here",
}) => {
  let [isOpen, setIsOpen] = useState(false);
  let [focus, setFocus] = useState(0);

  const addOption = (option) => () => {
    let list = selectedOptions;
    list.push(option);
    onChange(list);
    setIsOpen(false);
  };

  const deleteOption = (id) => () => {
    let list = selectedOptions;
    list.splice(id, 1);
    onChange(list);
    setIsOpen(false);
  };

  return (
    <div
      className="multi-select-container"
      tabIndex="0"
      onBlur={() => setIsOpen(false)}
    >
      <div className="multi-select" onClick={() => setIsOpen(!isOpen)}>
        <div className="selected-option-wrapper">
          {selectedOptions.length === 0 ? (
            <span>{placeholder}</span>
          ) : (
            selectedOptions.map((list, index) => {
              return (
                <span key={index} className="selected-option">
                  {list}
                  <span
                    className="delete-tag"
                    style={{ color: "black" }}
                    onClick={deleteOption(index)}
                  >
                    &#x2715;
                  </span>
                </span>
              );
            })
          )}
        </div>
        <i
          className="bi bi-chevron-down"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        ></i>
      </div>
      {isOpen && (
        <div className="multi-select-option">
          {options.length === selectedOptions.length ? (
            <div className="no-option">
              <span>No Options</span>
            </div>
          ) : (
            options.map((list, index) => {
              return (
                !selectedOptions.includes(list) && (
                  <div
                    key={index}
                    className="select-list"
                    style={{
                      backgroundColor: focus === index ? "lightgray" : "white",
                    }}
                    onMouseEnter={() => setFocus(index)}
                    onClick={addOption(list)}
                  >
                    <span>{list}</span>
                  </div>
                )
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
