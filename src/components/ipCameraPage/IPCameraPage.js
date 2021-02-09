import { Fragment } from "react";
import React from "react";

import DashboardImage from "../dashboard/DashboardImage";

const IPCameraPage = () => {
  return (
    <Fragment>
      <div className="row mb-3 mb-md-0">
        <div className="col-12 col-md-6">
          <h3 className="text-gray-700">IP kamera</h3>
        </div>
      </div>
      <DashboardImage columnClasses="col-12" />
    </Fragment>
  );
};

export default IPCameraPage;
