import React from "react";
import { Avatar, DropDown } from "components";
import { useAuth } from "hooks";

import styles from "./Profile.module.scss";

const Profile = () => {
  const dropDown = [
    {
      label: "Info",
      icon: "bx-info-circle",
    },
    {
      label: "Settings",
      icon: "bx-cog",
    },
    {
      label: "Help",
      icon: "bx-help-circle",
    },
  ];

  const { user } = useAuth();

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_bg}>
        <img
          src="https://themesbrand.com/doot/layouts/assets/images/small/img-4.jpg"
          className={styles.bg}
        />
        <div className={styles.title}>
          <b>My Profile</b>
          <i className="bx-dots-vertical-rounded" id="my-profile"></i>
          <DropDown selector="#my-profile" placement="bottom" zIndex={2001}>
            {dropDown.map(({ label, icon }, index) => {
              return (
                <DropDown.Item key={index} className="dropdown-option">
                  <span>{label}</span>
                  <i className={icon}></i>
                </DropDown.Item>
              );
            })}
          </DropDown>
        </div>
        <div className={styles.avatar}>
          <Avatar
            src={user?.avatar}
            name={user?.name}
            size={75}
            outlineSize={5}
            outline
            status={true}
            userId={user?.id}
          />
        </div>
      </div>
      <div className={styles.user_detail}>
        <div className={styles.user_name}>
          <b>Adam Zampa</b>
          <span>Front End Developer</span>
        </div>
        <div className={styles.user_status}>
          <p>
            If several languages coalesce, the grammar of the resulting language
            is more simple.
          </p>
        </div>
        <div className={styles.user_info}>
          <div>
            <i className="bx-user"></i>
            <span>Adam Zampa</span>
          </div>
          <div>
            <i className="bx-message-rounded-dots"></i>
            <span>adam@gmail.com</span>
          </div>
          <div>
            <i className="bx-location-plus"></i>
            <span>California, USA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
