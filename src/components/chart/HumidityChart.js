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

const HumidityChart = ({ data, height, syncId }) => {
  const humidityData = data.map((point) => ({
    time: point.ts,
    humidity: point.h,
  }));

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={humidityData} syncId={syncId}>
          <XAxis
            dataKey="time"
            name="Time"
            tickFormatter={(ts) => moment(ts).format("HH:mm")}
          />
          <YAxis unit="%" domain={["dataMin - 1", "dataMax + 1"]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(t) => t + "%"}
            labelFormatter={(ts) => moment(ts).format("HH:mm Do")}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="humidity"
            name="Humidity"
            stroke="#36b9cc"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

HumidityChart.defaultProps = {
  height: "400px",
};

HumidityChart.propTypes = {
  height: PropTypes.string,
  syncId: PropTypes.string,
};

export default HumidityChart;
