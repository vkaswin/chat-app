import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { ToastContainer } from "components";

import "assets/scss/abstracts.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  return (
    <Fragment>
      <Router />
      <ToastContainer />
    </Fragment>
  );
};
root.render(<App />);
