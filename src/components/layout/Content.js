import React from "react";
import { Route, Switch } from "react-router-dom";

import Topbar from "./Topbar";
import Dashboard from "../dashboard/Dashboard";

const Content = () => {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Topbar />
        <div className="container-fluid">
          <Switch>
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Content;
