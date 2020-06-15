import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "../../hooks/useUser";
import ROUTE from "../../util/routes";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to={ROUTE.DASHBOARD} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
