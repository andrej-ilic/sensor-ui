import React, { Fragment } from "react";

import useSensorState from "../../hooks/useSensorState";
import useRecentSensorData from "../../hooks/useRecentSensorData";

import Spinner from "../common/Spinner";
import SensorState from "./SensorState";
import DashboardCharts from "./DashboardCharts";
import DashboardImage from "./DashboardImage";

const Dashboard = () => {
  const [sensor, loading] = useSensorState();
  const [getPoints, pointsLoading] = useRecentSensorData();

  const points = getPoints();

  return (
    <Fragment>
      <h3 className="text-gray-700">Status senzora</h3>
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
          <DashboardImage />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
