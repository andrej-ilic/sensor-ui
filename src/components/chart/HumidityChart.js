import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import LineChart from "./LineChart";

const HumidityChart = ({ data, height, syncId }) => {
  const humidityData = data.map((point) => ({
    time: point.ts,
    humidity: point.h,
  }));

  return (
    <LineChart
      data={humidityData}
      color="#36b9cc"
      xName="Time"
      yName="Humidity"
      xKey="time"
      yKey="humidity"
      height={height}
      unit="%"
      tickFormatter={(ts) => moment(ts).format("HH:mm")}
      labelFormatter={(ts) => moment(ts).format("HH:mm Do")}
      syncId={syncId}
    />
  );
};

HumidityChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.string,
  syncId: PropTypes.string,
};

export default HumidityChart;
