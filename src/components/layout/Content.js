import { Route, Switch } from "react-router-dom";
import React from "react";

import ChartHistory from "../chartPage/ChartHistory";
import Dashboard from "../dashboard/Dashboard";
import IPCameraPage from "../ipCameraPage/IPCameraPage";
import Login from "../auth/Login";
import NotFound from "./NotFound";
import ProtectedRoute from "../auth/ProtectedRoute";
import PublicOnlyRoute from "../auth/PublicOnlyRoute";
import Register from "../auth/Register";
import ROUTE from "../../util/routes";
import Topbar from "./Topbar";
import WarningsPage from "../warnings/WarningsPage";

const Content = () => {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <Topbar />
        <div className="container-fluid">
          <Switch>
            <Route exact path={ROUTE.DASHBOARD} component={Dashboard} />
            <Route exact path={ROUTE.IP_CAMERA} component={IPCameraPage} />
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
