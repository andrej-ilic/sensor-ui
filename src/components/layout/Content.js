import React from "react";
import { Route, Switch } from "react-router-dom";

import Topbar from "./Topbar";
import Dashboard from "../dashboard/Dashboard";
import Login from "../auth/Login";

const Content = () => {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Topbar />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Content;
