import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Avatar, SearchBox, Toast } from "components";
import { useAuth } from "hooks";
import StatusCard from "./Card";
import StatusPopup from "./Popup";

import styles from "./Status.module.scss";
import { fileUpload } from "services/Others";
import { createStatus, getAllStatus } from "services/Status";

const StatusPage = () => {
  const { user } = useAuth();

  const [statusList, setStatusList] = useState([
    {
      _id: "630747c05006286373ffef6d",
      chatId: "630349d4634d5afb324cc562",
      status: [
        {
          _id: "63620498b30513caf298bf64",
          url: "https://firebasestorage.googleapis.com/v0/b/chat-app-d7a32.appspot.com/o/image%2Fdownload (1).jpeg?alt=media",
          date: "2022-11-02T05:48:08.367Z",
          seen: [
            {
              user: "6303217405f1714edcfc1cb6",
            },
          ],
        },
        {
          _id: "6362049fb30513caf298bf66",
          url: "https://firebasestorage.googleapis.com/v0/b/chat-app-d7a32.appspot.com/o/image%2Fdownload.jpeg?alt=media",
          date: "2022-11-02T05:48:15.686Z",
          seen: [
            {
              user: "6303217405f1714edcfc1cb6",
            },
          ],
        },
        {
          _id: "63620498b30513caf298bf64",
          url: "https://firebasestorage.googleapis.com/v0/b/chat-app-d7a32.appspot.com/o/image%2Fdownload (1).jpeg?alt=media",
          date: "2022-11-02T05:48:08.367Z",
          seen: [
            {
              user: "6303217405f1714edcfc1cb6",
            },
          ],
        },
        {
          _id: "6362049fb30513caf298bf66",
          url: "https://firebasestorage.googleapis.com/v0/b/chat-app-d7a32.appspot.com/o/image%2Fdownload.jpeg?alt=media",
          date: "2022-11-02T05:48:15.686Z",
          seen: [],
        },
        {
          _id: "6362049fb30513caf298bf66",
          url: "https://firebasestorage.googleapis.com/v0/b/chat-app-d7a32.appspot.com/o/image%2Fdownload.jpeg?alt=media",
          date: "2022-11-02T05:48:15.686Z",
          seen: [],
        },
      ],
      user: {
        _id: "63033ccb39175ac026b70761",
        name: "Karthick Kumar",
        email: "karthick@gmail.com",
        status: false,
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/chat-app-d7a32.appspot.com/o/image%2Favataaars%20(2).png?alt=media",
        colorCode: "#11C1DA",
      },
    },
    {
      _id: "630747c05006286373ffef64",
      chatId: "630349d4634d5afb324cc562",
      status: [
        {
          _id: "63620498b30513caf298bf64",
          url: "https://firebasestorage.googleapis.com/v0/b/chat-app-d7a32.appspot.com/o/image%2Fdownload (1).jpeg?alt=media",
          date: "2022-11-02T05:48:08.367Z",
          seen: [],
        },
        {
          _id: "6362049fb30513caf298bf66",
          url: "https://firebasestorage.googleapis.com/v0/b/chat-app-d7a32.appspot.com/o/image%2Fdownload.jpeg?alt=media",
          date: "2022-11-02T05:48:15.686Z",
          seen: [],
        },
        {
          _id: "6362049fb30513caf298bf66",
          url: "https://firebasestorage.googleapis.com/v0/b/chat-app-d7a32.appspot.com/o/image%2Fdownload.jpeg?alt=media",
          date: "2022-11-02T05:48:15.686Z",
          seen: [],
        },
      ],
      user: {
        _id: "63033ccb39175ac026b70761",
        name: "Lebron James",
        email: "lebron@gmail.com",
        status: false,
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/chat-app-d7a32.appspot.com/o/image%2Favataaars%20(2).png?alt=media",
        colorCode: "#11C1DA",
      },
    },
  ]);

  //   useEffect(() => {
  //     getStatusList();
  //   }, []);

  const getStatusList = async () => {
    try {
      let {
        data: {
          data: { list, pageMeta },
        },
      } = await getAllStatus();
      setStatusList(list);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const handleChange = async ({ target: { files } }) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("file", file);
    }
    try {
      let {
        data: {
          data: [url],
        },
      } = await fileUpload(formData);
      let res = await createStatus({ url, date: new Date().toISOString() });
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const allStatusList = useMemo(() => {
    if (!user?.id || statusList.length === 0)
      return [
        { title: "Recent Updates", list: [] },
        { title: "Viewed Updates", list: [] },
      ];

    let viewedList = statusList.filter((list) => {
      return list.status.every(({ seen }) => {
        let index = seen.findIndex(({ user: userId }) => {
          return user.id === userId;
        });
        return index >= 0;
      });
    });

    let recentList = statusList.filter((list) => {
      return list.status.some(({ seen }) => {
        let index = seen.findIndex(({ user: userId }) => {
          return user.id === userId;
        });
        return index == -1;
      });
    });

    return [
      { title: "Recent Updates", list: recentList },
      { title: "Viewed Updates", list: viewedList },
    ];
  }, [statusList, user]);

  return (
    <Fragment>
      <SearchBox placeholder="Search here..." title="Status" />
      <div className={styles.container}>
        <div className={styles.my_status}>
          <div className={styles.avatar}>
            <Avatar
              src={user?.avatar || user?.colorCode}
              name={user?.name}
              size={50}
            />
            <label htmlFor="my-status">
              <i className="bx-plus"></i>
            </label>
            <input id="my-status" type="file" onChange={handleChange} hidden />
          </div>
          <div className={styles.title}>
            <b>My Status</b>
            <span>Add to my status</span>
          </div>
          <div className={styles.icons}>
            <label htmlFor="my-status">
              <i className="bxs-camera"></i>
            </label>
            <label>
              <i className="bxs-pencil"></i>
            </label>
          </div>
        </div>
        {allStatusList.map(({ title, list }, index) => {
          return (
            list.length > 0 && (
              <div key={index} className={styles.status_list}>
                <div className={styles.title}>
                  <b>{title}</b>
                </div>
                {list.map((list) => {
                  return (
                    <StatusCard key={list._id} {...list} userId={user?.id} />
                  );
                })}
              </div>
            )
          );
        })}
      </div>
      <StatusPopup />
    </Fragment>
  );
};

export default StatusPage;
