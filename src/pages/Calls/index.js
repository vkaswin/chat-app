import React, { useEffect, useState } from "react";
import { Avatar, Toast } from "components";
import { useAuth, useRouter } from "hooks";
import { getCallHistory } from "services/Call";

import styles from "./Calls.module.scss";
import moment from "moment";

const Calls = () => {
  const { user } = useAuth();

  const router = useRouter();

  const [callHistory, setCallHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCalls();
  }, []);

  const getCalls = async () => {
    try {
      let {
        data: { data },
      } = await getCallHistory();
      setCallHistory([...callHistory, ...data]);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (chatId) => {
    router.push(`/chats/${chatId}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.calls_container}>
      {callHistory.length > 0 &&
        callHistory.map(
          (
            { date, type, user: { name, status, avatar }, initiatedBy, chatId },
            index
          ) => {
            return (
              <div
                key={index}
                className={styles.call_card}
                onClick={() => handleClick(chatId)}
              >
                <div className={styles.user}>
                  <Avatar src={avatar} name={name} size={40} status={status} />
                  <div className={styles.call_info}>
                    <span className="truncate-1">{name}</span>
                    <div>
                      {initiatedBy === user?.id ? (
                        <i className="bx-up-arrow-alt" data-type="outgoing"></i>
                      ) : (
                        <i
                          className="bx-down-arrow-alt"
                          data-type="incoming"
                        ></i>
                      )}
                      <span className="truncate-1">
                        {moment(date).format("D ddd YYYY, hh:mm a")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.type_icon}>
                  {type === "video" ? (
                    <i className="bx-video"></i>
                  ) : (
                    <i className="bx-phone-call"></i>
                  )}
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default Calls;
