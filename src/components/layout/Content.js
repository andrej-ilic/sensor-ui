import React from "react";
import { Route, Switch } from "react-router-dom";

import ROUTE from "../../util/routes";

import Topbar from "./Topbar";
import Dashboard from "../dashboard/Dashboard";
import Login from "../auth/Login";
import PublicOnlyRoute from "../auth/PublicOnlyRoute";
import ProtectedRoute from "../auth/ProtectedRoute";
import ChartHistory from "../chartPage/ChartHistory";
import Register from "../auth/Register";
import WarningsPage from "../warnings/WarningsPage";
import NotFound from "./NotFound";

const Content = () => {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Topbar />
        <div className="container-fluid">
          <Switch>
            <Route exact path={ROUTE.DASHBOARD} component={Dashboard} />
            <Route exact path={ROUTE.CHART_HISTORY} component={ChartHistory} />
            <PublicOnlyRoute exact path={ROUTE.LOGIN} component={Login} />
            <PublicOnlyRoute exact path={ROUTE.REGISTER} component={Register} />
            <ProtectedRoute
              exact
              path={ROUTE.WARNINGS}
              component={WarningsPage}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Content;
