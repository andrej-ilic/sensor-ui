import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import LineChart from "./LineChart";

const TemperatureChart = ({ data, height, syncId }) => {
  const temperatureData = data.map((point) => ({
    time: point.ts,
    temperature: point.t,
  }));

  return (
    <LineChart
      data={temperatureData}
      color="#e74a3b"
      xName="Time"
      yName="Temperature"
      xKey="time"
      yKey="temperature"
      height={height}
      unit="&deg;C"
      tickFormatter={(ts) => moment(ts).format("HH:mm")}
      labelFormatter={(ts) => moment(ts).format("HH:mm Do")}
      syncId={syncId}
      padding={0.2}
    />
  );
};

TemperatureChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.string,
  syncId: PropTypes.string,
};

export default TemperatureChart;
