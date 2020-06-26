import React, { useState } from "react";
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
  ReferenceArea,
} from "recharts";
import { useEffect } from "react";

const ZoomableLineChart = ({
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
  padding,
}) => {
  const [chartState, setChartState] = useState({
    data,
    leftArea: undefined,
    rightArea: undefined,
    zoomed: false,
  });

  useEffect(() => {
    setChartState((oldState) => ({
      ...oldState,
      data,
      leftArea: undefined,
      rightArea: undefined,
      zoomed: false,
    }));
  }, [data]);

  const stateData = chartState.data;

  if (!stateData || !stateData.length) {
    return <h1 className="my-3 text-center">No data yet</h1>;
  }

  const xTicks = [];
  let hour = Math.floor(stateData[0].time / (1000 * 60 * 60)) * 1000 * 60 * 60;
  for (let i = 0; i < 24; i++) {
    if (
      stateData[0].time < hour &&
      stateData[stateData.length - 1].time > hour
    ) {
      xTicks.push(hour);
    }
    hour += 1000 * 60 * 60;
  }

  const yTicks = [];
  const values = stateData.map((x) => x[yKey]);
  const botValue = parseFloat((Math.min(...values) - padding).toFixed(1));
  const topValue = parseFloat((Math.max(...values) + padding + 0.1).toFixed(1));
  for (let i = botValue; i <= topValue; i += 0.1) {
    yTicks.push(i.toFixed(1));
  }

  const zoom = () => {
    setChartState((oldState) => {
      if (
        oldState.leftArea !== oldState.rightArea &&
        oldState.leftArea &&
        oldState.rightArea
      ) {
        let left =
          oldState.leftArea < oldState.rightArea
            ? oldState.leftArea
            : oldState.rightArea;
        let right =
          oldState.leftArea < oldState.rightArea
            ? oldState.rightArea
            : oldState.leftArea;

        return {
          ...oldState,
          data: oldState.data.filter((x) => x.time >= left && x.time <= right),
          leftArea: undefined,
          rightArea: undefined,
          zoomed: true,
        };
      } else {
        return {
          ...oldState,
          leftArea: undefined,
          rightArea: undefined,
        };
      }
    });
  };

  const setLeftArea = (leftArea) =>
    setChartState((oldState) => ({ ...oldState, leftArea }));

  const setRightArea = (rightArea) =>
    setChartState((oldState) => {
      if (oldState.leftArea) return { ...oldState, rightArea };
      else return oldState;
    });

  const zoomOut = () => {
    setChartState({
      data,
      leftArea: undefined,
      rightArea: undefined,
      zoomed: false,
    });
  };

  return (
    <div>
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>
          <LineChart
            data={stateData}
            syncId={syncId}
            onMouseDown={(e) => setLeftArea(e.activeLabel)}
            onMouseMove={(e) => setRightArea(e.activeLabel)}
            onMouseUp={zoom}
            style={{ userSelect: "none" }}
          >
            <XAxis
              dataKey={xKey}
              name={xName}
              tickFormatter={tickFormatter}
              domain={["dataMin", "dataMax"]}
              ticks={xTicks}
              minTickGap={30}
              type="number"
            />
            <YAxis
              ticks={yTicks}
              minTickGap={36}
              unit={unit}
              domain={[`dataMin - ${padding}`, `dataMax + ${padding}`]}
            />
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
              dataKey={yKey}
              name={yName}
              stroke={color}
              strokeWidth={2}
              dot={false}
              animationDuration={500}
            />
            {chartState.leftArea && chartState.rightArea && (
              <ReferenceArea
                x1={chartState.leftArea}
                x2={chartState.rightArea}
                strokeOpacity={0.3}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      {chartState.zoomed && (
        <button
          className="btn btn-sm btn-primary btn-icon-split position-absolute m-3"
          style={{ top: 0, right: 0 }}
          onClick={zoomOut}
        >
          <span className="icon text-white-50">
            <i className="fas fa-search-minus"></i>
          </span>
          <span className="text">Zoom out</span>
        </button>
      )}
    </div>
  );
};

ZoomableLineChart.defaultProps = {
  height: "400px",
  unit: "",
  padding: 0.1,
};

ZoomableLineChart.propTypes = {
  data: PropTypes.array,
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
  padding: PropTypes.number,
};

export default ZoomableLineChart;
