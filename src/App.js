import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Content from "./components/layout/Content";

const App = () => {
  return (
    <Router>
      <div id="wrapper">
        <Sidebar />
        <Content />
      </div>
    </Router>
  );
};

export default App;
