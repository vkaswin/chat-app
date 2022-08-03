import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ProvideAuth } from "hooks/useAuth";
import { Router } from "./router";
import { ToastContainer } from "components";
import reportWebVitals from "./reportWebVitals";

import "assets/scss/abstracts.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    try {
      await Notification.requestPermission();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <ProvideAuth>
        <Router />
        <ToastContainer />
      </ProvideAuth>
    </Fragment>
  );
};
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
