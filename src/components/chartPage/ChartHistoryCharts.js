import React, { Fragment } from "react";
import PropTypes from "prop-types";

import TemperatureChart from "../chart/TemperatureChart";
import HumidityChart from "../chart/HumidityChart";

const ChartHistoryCharts = ({ data }) => {
  return (
    <Fragment>
      <div className="col-12 col-xl-6">
        <div className="card shadow animated--grow-in">
          <div className="card-body">
            <TemperatureChart data={data} height="45vh" syncId="chartHistory" />
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-6 mt-3 mt-xl-0">
        <div className="card shadow animated--grow-in">
          <div className="card-body">
            <HumidityChart data={data} height="45vh" syncId="chartHistory" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ChartHistoryCharts.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ChartHistoryCharts;
