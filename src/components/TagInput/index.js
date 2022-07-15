import React, { useState } from "react";

import "./TagInput.scss";

export const TagInput = ({
  onChange,
  tagList = [],
  placeholder = "Type here",
  isAutoFocus = false,
  tagBackground = "#337ab7",
  tagColor = "white",
  inputClassName = "tag-input",
  containerClassName = "tag-container",
}) => {
  let [tag, setTag] = useState("");

  let [, setState] = useState();

  const handleTags = (e) => {
    setTag(e.target.value);
  };

  const handleKeyUp = async (e) => {
    if (e.key === "Enter" && tag !== "") {
      let tagItem = tagList;
      tagItem.push(e.target.value);
      onChange(tagItem);
      setTag("");
    } else if (e.key === "Backspace") {
      let tagItem = tagList;
      tagItem.splice(tagList.length - 1, 1);
      onChange(tagItem);
      setState(Math.random());
    }
  };

  const deleteTag = (index) => {
    let tagItem = tagList;
    tagItem.splice(index, 1);
    onChange(tagItem);
    setState(Math.random());
  };

  return (
    <div className={containerClassName}>
      <div className="tag-list">
        {tagList.map((list, index) => {
          return (
            <span
              key={index}
              className="tags"
              style={{ backgroundColor: tagBackground, color: tagColor }}
              onClick={() => deleteTag(index)}
            >
              {list}
              <span className="delete-tag" style={{ color: tagColor }}>
                &#x2715;
              </span>
            </span>
          );
        })}
        <input
          type="text"
          placeholder={placeholder}
          className={inputClassName}
          value={tag}
          onChange={handleTags}
          onKeyUp={handleKeyUp}
          autoFocus={isAutoFocus}
        />
      </div>
    </div>
  );
};
