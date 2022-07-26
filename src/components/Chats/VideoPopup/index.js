import React from "react";
import { Modal } from "components";

import styles from "./VideoPopup.module.scss";

export const VideoPopup = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen} width={750} closeClickOnOutside={false}>
      <div className={styles.video_container}>
        <video
          id="local-stream"
          className={styles.local}
          poster="https://vue.pixelstrap.com/chitchat/_nuxt/img/videocall.336a27d.jpg"
          autoPlay
        ></video>
        <video
          id="remote-stream"
          className={styles.remote}
          poster="https://vue.pixelstrap.com/chitchat/_nuxt/img/videocall_bg.ab164fb.jpg"
          autoPlay
        ></video>
      </div>
    </Modal>
  );
};
