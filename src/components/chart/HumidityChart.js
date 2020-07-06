import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import LineChart from "./LineChart";
import ZoomableLineChart from "./ZoomableLineChart";

const HumidityChart = ({ data, height, syncId, zoomable }) => {
  const humidityData = data.map((point) => ({
    time: point.ts,
    humidity: point.h,
    averageHumidity: point.ah,
  }));

  if (zoomable) {
    return (
      <ZoomableLineChart
        data={humidityData}
        color="#36b9cc"
        avgColor="#1cc88a"
        xName="Vreme"
        yName="Vlažnost"
        avgYName="Prosečna vlažnost (1h)"
        xKey="time"
        yKey="humidity"
        avgYKey="averageHumidity"
        height={height}
        unit="%"
        tickFormatter={(ts) => moment(ts).format("HH:mm")}
        labelFormatter={(ts) => moment(ts).format("HH:mm Do MMM")}
        syncId={syncId}
        padding={0.1}
      />
    );
  }

  return (
    <LineChart
      data={humidityData}
      color="#36b9cc"
      avgColor="#1cc88a"
      xName="Vreme"
      yName="Vlažnost"
      avgYName="Prosečna vlažnost (1h)"
      xKey="time"
      yKey="humidity"
      avgYKey="averageHumidity"
      height={height}
      unit="%"
      tickFormatter={(ts) => moment(ts).format("HH:mm")}
      labelFormatter={(ts) => moment(ts).format("HH:mm Do MMM")}
      syncId={syncId}
      padding={0.1}
    />
  );
};

HumidityChart.propTypes = {
  data: PropTypes.array,
  height: PropTypes.string,
  syncId: PropTypes.string,
  zoomable: PropTypes.bool,
};

export default HumidityChart;
