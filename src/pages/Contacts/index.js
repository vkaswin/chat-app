import React, { Fragment, useEffect, useState } from "react";
import { Avatar, DropDown, Toast } from "components";
import { classNames, handleChat } from "utils";
import { getContacts } from "services/Contact";

import styles from "./Contacts.module.scss";

const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    try {
      let {
        data: { data },
      } = await getContacts();
      sortContactsByName(data);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const sortContactsByName = (contactList) => {
    let contactByAlphabets = alphabets.map((letter) => {
      let list = contactList.filter(({ user: { name } }) => {
        return name.charAt(0).toLowerCase() === letter;
      });

      return {
        word: letter.toUpperCase(),
        users:
          list.length > 0
            ? list.sort((a, b) => a.user.name.localeCompare(b.user.name))
            : list,
      };
    });
    setContacts([...contacts, ...contactByAlphabets]);
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
                  { user: { name, avatar, status, _id: userId }, chatId, _id },
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
                            src={avatar}
                            name={name}
                            size={35}
                            status={status}
                            userId={userId}
                          />
                          <span>{name}</span>
                        </div>
                        <i
                          className="bx-dots-vertical-rounded"
                          id={`${word}-${ind}`}
                        ></i>
                      </div>
                      <DropDown placement="bottom" selector={`#${word}-${ind}`}>
                        <DropDown.Item className="dropdown-option">
                          <span>Block</span>
                          <i className="bx-block"></i>
                        </DropDown.Item>
                        <DropDown.Item className="dropdown-option">
                          <span>Remove</span>
                          <i className="bx-trash"></i>
                        </DropDown.Item>
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
