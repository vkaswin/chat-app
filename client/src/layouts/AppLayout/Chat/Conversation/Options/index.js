import React from "react";
import { DropDown, DropDownItem } from "components";

export const Options = ({
  onReply,
  onDelete,
  onCopy,
  selector,
  date,
  msgId,
  msg,
}) => {
  return (
    <DropDown selector={selector} placement="bottom">
      <DropDownItem
        className="dropdown-option"
        onClick={() => onReply(date, msgId)}
      >
        <span>Reply</span>
        <i className="bx-share"></i>
      </DropDownItem>
      <DropDownItem className="dropdown-option">
        <span>Forward</span>
        <i className="bx-share-alt"></i>
      </DropDownItem>
      <DropDownItem className="dropdown-option" onClick={() => onCopy(msg)}>
        <span>Copy</span>
        <i className="bx-copy"></i>
      </DropDownItem>
      <DropDownItem
        className="dropdown-option"
        onClick={() => onDelete(date, msgId)}
      >
        <span>Delete</span>
        <i className="bx-trash"></i>
      </DropDownItem>
    </DropDown>
  );
};
