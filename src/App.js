import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";

const App = () => {
  return (
    <Router>
      <div>
        <Sidebar />
        {/* <Content /> */}
      </div>
    </Router>
  );
};

export default App;
