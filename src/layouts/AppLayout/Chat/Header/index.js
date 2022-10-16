import React, { Fragment } from "react";
import { DropDown, Avatar, DropDownItem } from "components";
import { classNames } from "utils";

import styles from "./Header.module.scss";

export const Header = ({
  clearChatId,
  chatDetails,
  toggleInfo,
  handleCall,
  show,
}) => {
  const { matches } = matchMedia(`(max-width: 768px)`);

  return (
    <div className={classNames(styles.chat_header, show && styles.show)}>
      <div className={styles.user_info}>
        <div className={styles.go_back} onClick={clearChatId}>
          <i className="bx bx-chevron-left"></i>
        </div>
        <Avatar
          src={chatDetails?.avatar}
          name={chatDetails?.name}
          size={50}
          status={chatDetails?.status}
          userId={chatDetails?.userId}
        />
        <div className={styles.user_name}>
          <b>{chatDetails?.name}</b>
          <span userid={chatDetails?.userId}>
            {chatDetails?.totalMembers
              ? `${chatDetails?.totalMembers} Members`
              : chatDetails?.status
              ? "Online"
              : "Offline"}
          </span>
        </div>
      </div>
      <div className={styles.chat_icons}>
        {/* <i className="bxs-phone-call"></i> */}
        <i className="bx-video" onClick={() => handleCall("video")}></i>
        <i className="bxs-info-circle" onClick={toggleInfo}></i>
        <i className="bx-dots-vertical-rounded" id="more-option"></i>
        <DropDown selector="#more-option" placement="bottom-end">
          {matches && (
            <Fragment>
              <DropDownItem className="dropdown-option" onClick={toggleInfo}>
                <span>View Profile</span>
                <i className="bx bx-user"></i>
              </DropDownItem>
              {/* <DropDownItem
                  className="dropdown-option"
                  onClick={() => handleCall("audio")}
                >
                  <span>Audio</span>
                  <i className="bx bxs-phone-call"></i>
                </DropDownItem> */}
              <DropDownItem
                className="dropdown-option"
                onClick={() => handleCall("video")}
              >
                <span>Video</span>
                <i className="bx bx-video"></i>
              </DropDownItem>
            </Fragment>
          )}
          <DropDownItem className="dropdown-option">
            <span>Muted</span>
            <i className="bx-microphone-off"></i>
          </DropDownItem>
          <DropDownItem className="dropdown-option">
            <span>Delete</span>
            <i className="bx-trash"></i>
          </DropDownItem>
        </DropDown>
      </div>
    </div>
  );
};
