import React, { Fragment } from "react";
import { Avatar, DropDown, DropDownItem } from "components";
import { classNames } from "utils";

import styles from "./ContactCard.module.scss";

const ContactCard = ({
  name,
  avatar,
  status,
  userId,
  chatId,
  _id,
  colorCode,
  handleChat,
}) => {
  return (
    <Fragment>
      <div className={classNames(styles.contact_card)}>
        <div className={styles.user} onClick={() => handleChat(chatId)}>
          <Avatar
            src={avatar || colorCode}
            name={name}
            size={35}
            status={status}
            userId={userId}
          />
          <span>{name}</span>
        </div>
        <i className="bx-dots-vertical-rounded" id={`contact-${_id}`}></i>
      </div>
      <DropDown placement="bottom" selector={`#contact-${_id}`}>
        <DropDownItem className="dropdown-option">
          <span>Block</span>
          <i className="bx-block"></i>
        </DropDownItem>
        <DropDownItem className="dropdown-option">
          <span>Remove</span>
          <i className="bx-trash"></i>
        </DropDownItem>
      </DropDown>
    </Fragment>
  );
};

export default ContactCard;
