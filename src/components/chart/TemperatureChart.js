import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TemperatureChart = ({ data, height, syncId }) => {
  const temperatureData = data.map((point) => ({
    time: point.ts,
    temperature: point.t,
  }));

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={temperatureData} syncId={syncId}>
          <XAxis
            dataKey="time"
            name="Time"
            tickFormatter={(ts) => moment(ts).format("HH:mm")}
          />
          <YAxis unit="&deg;C" domain={["dataMin - 1", "dataMax + 1"]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(t) => t + "°C"}
            labelFormatter={(ts) => moment(ts).format("HH:mm Do")}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            name="Temperature"
            stroke="#e74a3b"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

TemperatureChart.defaultProps = {
  height: "400px",
};

TemperatureChart.propTypes = {
  height: PropTypes.string,
  syncId: PropTypes.string,
};

export default TemperatureChart;
