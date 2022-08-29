import React from "react";
import { Avatar } from "components";
import { useAuth } from "hooks";

import styles from "./Settings.module.scss";

const Settings = () => {
  const { user } = useAuth();

  const handleFile = (e) => {
    console.log(e);
  };

  return (
    <div className={styles.settings_container}>
      <div className={styles.settings_bg}>
        <img
          src="https://themesbrand.com/doot/layouts/assets/images/small/img-4.jpg"
          className={styles.bg}
        />
        <div className={styles.title}>
          <b>My Settings</b>
          <label htmlFor="settings-file" className={styles.edit_bg}>
            <i className="bxs-pencil"></i>
            <input
              id="settings-file"
              type="file"
              onChange={handleFile}
              hidden
            />
          </label>
        </div>
        <div className={styles.avatar}>
          <Avatar
            src={user?.avatar}
            name={user?.name}
            size={75}
            outlineSize={5}
            outline
            upload
            status={true}
            userId={user?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
