import React from "react";
import callList from "data/calls.json";

import styles from "./Calls.module.scss";
import { Avatar } from "components";

const Calls = () => {
  return (
    <div className={styles.calls_container}>
      {callList.map(
        (
          {
            isVideoCall = false,
            isAudioCall = false,
            isIncoming = false,
            isOutgoing = false,
            callTime,
            dateTime,
            name,
            profile,
          },
          index
        ) => {
          return (
            <div key={index} className={styles.call_card}>
              <div className={styles.user}>
                <Avatar src={profile} userName={name} size={40} />
                <div className={styles.call_info}>
                  <span className="truncate-1">{name}</span>
                  <div>
                    {isIncoming && (
                      <i className="bx-down-arrow-alt" data-type="incoming"></i>
                    )}
                    {isOutgoing && (
                      <i className="bx-up-arrow-alt" data-type="outgoing"></i>
                    )}
                    <span className="truncate-1">{dateTime}</span>
                  </div>
                </div>
              </div>
              <div className={styles.call_time}>
                <b>{callTime}</b>
                {isVideoCall && <i className="bx-video"></i>}
                {isAudioCall && <i className="bx-phone-call"></i>}
              </div>
            </div>
          );
        }
      )}
      <div></div>
    </div>
  );
};

export default Calls;
