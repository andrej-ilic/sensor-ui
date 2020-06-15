import React from "react";

import Sidebar from "./components/layout/Sidebar";
import Content from "./components/layout/Content";

const App = () => {
  return (
    <div id="wrapper">
      <Sidebar />
      <Content />
    </div>
  );
};

export default App;
