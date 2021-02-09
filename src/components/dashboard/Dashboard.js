import React, { Fragment } from "react";

import useSensorState from "../../hooks/useSensorState";
import useRecentSensorData from "../../hooks/useRecentSensorData";

import Spinner from "../common/Spinner";
import SensorState from "./SensorState";
import DashboardCharts from "./DashboardCharts";
import DashboardImage from "./DashboardImage";

const Dashboard = () => {
  const [sensor, loading] = useSensorState();
  const [getPoints, pointsLoading, downloadAsCSV] = useRecentSensorData();

  const points = getPoints();

  return (
    <Fragment>
      <div className="row mb-3 mb-md-0">
        <div className="col-12 col-md-6">
          <h3 className="text-gray-700">Status senzora</h3>
        </div>
        <div className="col-12 col-md-6">
          <button
            className="btn btn-primary btn-sm btn-icon-split float-none float-md-right animated--grow-in"
            onClick={downloadAsCSV}
          >
            <span className="icon text-white-50">
              <i className="fas fa-download"></i>
            </span>
            <span className="text">Preuzmi CSV</span>
          </button>
        </div>
      </div>
      {loading || pointsLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <SensorState
            temperature={sensor.temperature}
            humidity={sensor.humidity}
            averageTemperature={sensor.averageTemperature}
            averageHumidity={sensor.averageHumidity}
          />
          <DashboardCharts points={points} />
          <DashboardImage columnClasses="col-12 col-xl-7" />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
