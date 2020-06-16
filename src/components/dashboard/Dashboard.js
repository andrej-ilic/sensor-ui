import React, { Fragment } from "react";

import useSensorState from "../../hooks/useSensorState";
import useRecentSensorData from "../../hooks/useRecentSensorData";

import Spinner from "../common/Spinner";
import SensorState from "./SensorState";
import DashboardCharts from "./DashboardCharts";

const Dashboard = () => {
  const [sensor, loading] = useSensorState();
  const [getPoints, pointsLoaded] = useRecentSensorData();

  return (
    <Fragment>
      <h3 className="text-gray-700">Dashboard</h3>
      {loading || !pointsLoaded ? (
        <Spinner />
      ) : (
        <Fragment>
          <SensorState
            temperature={sensor.temperature}
            humidity={sensor.humidity}
            averageTemperature={sensor.averageTemperature}
            averageHumidity={sensor.averageHumidity}
          />
          <DashboardCharts points={getPoints()} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
