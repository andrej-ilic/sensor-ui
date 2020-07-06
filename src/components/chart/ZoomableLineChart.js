import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import LineChart from "./LineChart";

const ZoomableLineChart = ({ data, ...rest }) => {
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
      <LineChart
        data={chartState.data}
        onMouseDown={(e) => e && setLeftArea(e.activeLabel)}
        onMouseMove={(e) => e && setRightArea(e.activeLabel)}
        onMouseUp={zoom}
        leftArea={chartState.leftArea}
        rightArea={chartState.rightArea}
        {...rest}
      />
      {chartState.zoomed && (
        <button
          className="btn btn-sm btn-primary btn-icon-split position-absolute m-3"
          style={{ top: 0, right: 0 }}
          onClick={zoomOut}
        >
          <span className="icon text-white-50">
            <i className="fas fa-search-minus"></i>
          </span>
          <span className="text">Prikaži sve</span>
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
  avgColor: PropTypes.string,
  xName: PropTypes.string,
  yName: PropTypes.string,
  avgYName: PropTypes.string,
  xKey: PropTypes.string.isRequired,
  yKey: PropTypes.string.isRequired,
  avgYKey: PropTypes.string,
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
