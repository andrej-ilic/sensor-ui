import React from "react";
import PropTypes from "prop-types";

import TemperatureChart from "../chart/TemperatureChart";
import HumidityChart from "../chart/HumidityChart";

const ChartHistoryCharts = ({ data }) => {
  return (
    <div className="row mt-3">
      <div className="col-12 col-xl-6">
        <div className="card shadow animated--grow-in">
          <div className="card-body">
            {!!data ? (
              <TemperatureChart
                data={data}
                height="45vh"
                syncId="chartHistory"
              />
            ) : (
              <h3 className="my-3 text-center">
                No temperature data for selected day
              </h3>
            )}
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-6 mt-3 mt-xl-0">
        <div className="card shadow animated--grow-in">
          <div className="card-body">
            {!!data ? (
              <HumidityChart data={data} height="45vh" syncId="chartHistory" />
            ) : (
              <h3 className="my-3 text-center">
                No temperature data for selected day
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ChartHistoryCharts.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ChartHistoryCharts;
