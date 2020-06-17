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
  ReferenceLine,
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
  average,
  averageColor,
}) => {
  const ticks = [];
  let hour =
    Math.floor((Date.now() - 1000 * 60 * 60 * 24) / (1000 * 60 * 60)) *
    1000 *
    60 *
    60;
  for (let i = 0; i < 24; i++) {
    if (data[0].time < hour) {
      ticks.push(hour);
    }
    hour += 1000 * 60 * 60;
  }

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data} syncId={syncId}>
          <XAxis
            dataKey={xKey}
            name={xName}
            tickFormatter={tickFormatter}
            domain={["dataMin", "dataMax"]}
            ticks={ticks}
            minTickGap={30}
            type="number"
          />
          <YAxis unit={unit} domain={["dataMin - 1", "dataMax + 1"]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={(x) => x + unit}
            labelFormatter={labelFormatter}
          />
          <Legend />
          {average !== undefined && (
            <ReferenceLine y={average} stroke={averageColor} />
          )}
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
  average: PropTypes.number,
  averageColor: PropTypes.string,
};

export default CustomLineChart;
