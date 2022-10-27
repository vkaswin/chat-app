import React, { Fragment, useEffect, useState } from "react";
import { Toast } from "components";
import { debounce } from "utils";
import { useAuth } from "hooks";
import { getContacts } from "services/Contact";
import { searchUsers } from "services/User";
import { getChatId } from "services/Chat";
import ContactCard from "./Card";

import styles from "./Contacts.module.scss";

const Contacts = () => {
  const { handleChat } = useAuth();

  const [contacts, setContacts] = useState([]);

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  let limit = 25;

  useEffect(() => {
    getAllContacts();
  }, []);

  useEffect(() => {
    if (search.length === 0) return;
    getUsers(1);
  }, [search]);

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

  const getUsers = async (page) => {
    let params = {
      page,
      limit,
      search,
    };

    try {
      let {
        data: { data },
      } = await searchUsers(params);
      setUsers(data);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const handleChange = async ({ target: { value } }) => {
    value.length === 0 ? setSearch("") : setSearch(value);
  };

  const handleClick = async (chatId, userId) => {
    if (chatId) return handleChat(chatId);

    try {
      let {
        data: { data },
      } = await getChatId(userId);
      handleChat(data);
    } catch (error) {
      console.log(error);
      Toast({ type: "error", message: error?.message });
    }
  };

  return (
    <div className={styles.contacts_list}>
      <div>
        <input type="text" onChange={debounce(handleChange, 500)} />
      </div>
      {search.length === 0 ? (
        <Fragment>
          {contacts?.map(({ word, users }, index) => {
            return (
              users.length > 0 && (
                <Fragment key={index}>
                  <div className={styles.title}>
                    <b>{word}</b>
                  </div>
                  {users.map((user, ind) => {
                    return (
                      <ContactCard
                        key={ind}
                        handleClick={handleClick}
                        {...user}
                      />
                    );
                  })}
                </Fragment>
              )
            );
          })}
        </Fragment>
      ) : (
        <Fragment>
          {users.map((user, index) => {
            return (
              <ContactCard key={index} handleClick={handleClick} {...user} />
            );
          })}
        </Fragment>
      )}
    </div>
  );
};

export default Contacts;
