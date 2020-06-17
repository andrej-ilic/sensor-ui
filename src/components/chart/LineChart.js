import React from "react";
import PropTypes from "prop-types";
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

const CustomLineChart = ({
  data,
  color,
  xName,
  yName,
  xKey,
  yKey,
  height,
  unit,
  tickFormatter,
  labelFormatter,
  syncId,
}) => {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data} syncId={syncId}>
          <XAxis
            dataKey={xKey}
            name={xName}
            tickFormatter={tickFormatter}
            domain={["auto", "auto"]}
            type="number"
          />
          <YAxis unit={unit} domain={["dataMin - 1", "dataMax + 1"]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(x) => x + unit}
            labelFormatter={labelFormatter}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={yKey}
            name={yName}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

CustomLineChart.defaultProps = {
  height: "400px",
  unit: "",
};

CustomLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  color: PropTypes.string,
  xName: PropTypes.string,
  yName: PropTypes.string,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
  height: PropTypes.string,
  unit: PropTypes.string,
  tickFormatter: PropTypes.func,
  labelFormatter: PropTypes.func,
  syncId: PropTypes.string,
};

export default CustomLineChart;
