import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import LineChart from "./LineChart";
import ZoomableLineChart from "./ZoomableLineChart";

const TemperatureChart = ({ data, height, syncId, zoomable }) => {
  const temperatureData = data.map((point) => ({
    time: point.ts,
    temperature: point.t,
  }));

  if (zoomable) {
    return (
      <ZoomableLineChart
        data={temperatureData}
        color="#e74a3b"
        xName="Vreme"
        yName="Temperatura"
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
  }

  return (
    <LineChart
      data={temperatureData}
      color="#e74a3b"
      xName="Vreme"
      yName="Temperatura"
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
  data: PropTypes.array,
  height: PropTypes.string,
  syncId: PropTypes.string,
  zoomable: PropTypes.bool,
};

export default TemperatureChart;
