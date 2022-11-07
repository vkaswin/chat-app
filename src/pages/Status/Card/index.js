import { Avatar } from "components";
import React, { useMemo } from "react";
import moment from "moment";

import styles from "./StatusCard.module.scss";

const StatusCard = ({
  status,
  chatId,
  _id,
  user: { avatar, colorCode, name, email, _id: userid, status: userStatus },
  userId,
}) => {
  let gap = 10;
  let radius = 50;
  let circumference = 2 * Math.PI * radius;

  const getStrokeDashArray = (size, seenCount) => {
    let str = "";
    for (let i = 1; i <= seenCount; i++) {
      if (seenCount === 1) {
        str = `${size} ${circumference - size} `;
      } else if (i === seenCount) {
        str += `${size} ${
          circumference -
          str.split(" ").reduce((value, current) => {
            return value + +current;
          }, size)
        } `;
      } else {
        str += `${size} ${gap} `;
      }
    }
    return str.trim();
  };

  const circleSvg = useMemo(() => {
    if (!userId) return;

    let seenCount = status.reduce((value, { seen }) => {
      let index = seen.findIndex(({ user }) => {
        return user === userId;
      });
      return index !== -1 ? value + 1 : value;
    }, 0);

    let size = (circumference - gap * status.length) / status.length;
    let strokeDashoffset = circumference / 4;
    let notSeenCount = status.length - seenCount;

    if (
      seenCount === status.length ||
      seenCount === 0 ||
      notSeenCount === status.length ||
      notSeenCount === 0
    ) {
      return (
        <svg width="48" height="48" viewBox="0 0 104 104">
          <circle
            cx="52"
            cy="52"
            r={radius}
            fill="none"
            strokeLinecap="round"
            strokeDashoffset={
              notSeenCount > 1 || seenCount > 1 ? strokeDashoffset : ""
            }
            strokeDasharray={`${
              notSeenCount > 1 || seenCount > 1 ? size : size + gap
            } ${notSeenCount > 1 || seenCount > 1 ? gap : ""}`.trim()}
            strokeWidth="4"
            stroke={seenCount === 0 ? "#008168" : "#AFB3B9"}
          ></circle>
        </svg>
      );
    } else {
      let seenStrokeDashArray = getStrokeDashArray(size, seenCount);
      let notSeenStrokeDashArray = getStrokeDashArray(size, notSeenCount);
      let strokeDashArray = seenStrokeDashArray.split(" ");
      let notSeenStrokeDashOffset =
        +strokeDashArray[strokeDashArray.length - 1] + circumference / 4 - gap;

      return (
        <svg width="48" height="48" viewBox="0 0 104 104">
          <circle
            cx="52"
            cy="52"
            r={radius}
            fill="none"
            strokeLinecap="round"
            strokeDashoffset={strokeDashoffset}
            strokeDasharray={seenStrokeDashArray}
            strokeWidth="4"
            stroke="#AFB3B9"
          ></circle>
          <circle
            cx="52"
            cy="52"
            r={radius}
            fill="none"
            strokeLinecap="round"
            strokeDashoffset={notSeenStrokeDashOffset}
            strokeDasharray={notSeenStrokeDashArray}
            strokeWidth="4"
            stroke="#008168"
          ></circle>
        </svg>
      );
    }
  }, [status, userId]);

  const lastStatusDate = useMemo(() => {
    return moment(status.at(-1).date).startOf("hour").fromNow();
  }, [status]);

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        {circleSvg}
        <div className={styles.profile}>
          <Avatar
            src={avatar || colorCode}
            name={name}
            userId={userid}
            status={userStatus}
            outline={false}
            size={42}
          />
        </div>
      </div>
      <div className={styles.user_info}>
        <b>{name}</b>
        <span>{lastStatusDate}</span>
      </div>
    </div>
  );
};

export default StatusCard;
