import React, { Fragment, useEffect, useState } from "react";
import alphabets from "data/alphabets.json";
import contactsList from "data/contacts.json";

import styles from "./Contacts.module.scss";
import { Avatar, DropDown } from "components";
import { classNames } from "utils";

const Contacts = () => {
  const dropdown = [
    {
      label: "Edit",
      icon: "bx-pencil",
    },
    {
      label: "Block",
      icon: "bx-block",
    },
    {
      label: "Delete",
      icon: "bx-trash",
    },
  ];

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    sortContactsByName();
  }, []);

  const sortContactsByName = () => {
    let contactByAlphabets = alphabets.map((letter) => {
      let list = contactsList.filter(({ name }) => {
        return name.charAt(0).toLowerCase() === letter;
      });

      return {
        word: letter.toUpperCase(),
        users:
          list.length > 0
            ? list.sort((a, b) => a.name.localeCompare(b.name))
            : list,
      };
    });
    console.log([...contacts, ...contactByAlphabets]);
    setContacts([...contacts, ...contactByAlphabets]);
  };

  return (
    <div className={styles.contacts_list}>
      {contacts?.map(({ word, users }, index) => {
        return (
          users.length > 0 && (
            <Fragment key={index}>
              <div className={styles.title}>
                <b>{word}</b>
              </div>
              {users.map(({ name, profile, status }, ind) => {
                return (
                  <Fragment key={ind}>
                    <div className={classNames(styles.contact_card)}>
                      <div className={styles.user}>
                        <Avatar
                          src={profile}
                          userName={name}
                          size={35}
                          status={status}
                        />
                        <span>{name}</span>
                      </div>
                      <i
                        className="bx-dots-vertical-rounded"
                        id={`${word}-${ind}`}
                      ></i>
                    </div>
                    <DropDown
                      position="bottom-center"
                      selector={`#${word}-${ind}`}
                    >
                      {dropdown.map(({ icon, label }, i) => {
                        return (
                          <DropDown.Item
                            key={i}
                            className={styles.contact_option}
                          >
                            <span>{label}</span>
                            <i className={icon}></i>
                          </DropDown.Item>
                        );
                      })}
                    </DropDown>
                  </Fragment>
                );
              })}
            </Fragment>
          )
        );
      })}
    </div>
  );
};

export default Contacts;