import React from "react";

import Sidebar from "./components/layout/Sidebar";
import Content from "./components/layout/Content";

import withAuthentication from "./hoc/withAuthentication";

const App = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      <Content />
    </div>
  );
};

export default withAuthentication(App);
