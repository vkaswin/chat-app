import React, { Fragment, useEffect, useState } from "react";
import { Avatar, DropDown, Toast, DropDownItem } from "components";
import { classNames } from "utils";
import { useAuth } from "hooks";
import { getContacts } from "services/Contact";

import styles from "./Contacts.module.scss";

const Contacts = () => {
  const { handleChat } = useAuth();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    try {
      let {
        data: { data },
      } = await getContacts();
      setContacts(data);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  return (
    <div id="contacts-container" className={styles.contacts_list}>
      {contacts?.map(({ word, users }, index) => {
        return (
          users.length > 0 && (
            <Fragment key={index}>
              <div className={styles.title}>
                <b>{word}</b>
              </div>
              {users.map(
                (
                  { name, avatar, status, userId, chatId, _id, colorCode },
                  ind
                ) => {
                  return (
                    <Fragment key={ind}>
                      <div className={classNames(styles.contact_card)}>
                        <div
                          className={styles.user}
                          onClick={() => handleChat(chatId)}
                        >
                          <Avatar
                            src={avatar || colorCode}
                            name={name}
                            size={35}
                            status={status}
                            userId={userId}
                          />
                          <span>{name}</span>
                        </div>
                        <i className="bx-dots-vertical-rounded" id={_id}></i>
                      </div>
                      <DropDown placement="bottom" selector={`#${word}-${ind}`}>
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
                }
              )}
            </Fragment>
          )
        );
      })}
    </div>
  );
};

export default Contacts;
