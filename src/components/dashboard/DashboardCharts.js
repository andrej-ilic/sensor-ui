import React from "react";

import TemperatureChart from "../chart/TemperatureChart";
import HumidityChart from "../chart/HumidityChart";

const DashboardCharts = ({ points }) => {
  return (
    <div className="row my-3">
      <div className="col-12 col-xl-6">
        <div className="card shadow animated--grow-in">
          <div className="card-body">
            <TemperatureChart data={points} height="45vh" syncId="dashboard" />
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-6 mt-3 mt-xl-0">
        <div className="card shadow animated--grow-in">
          <div className="card-body">
            <HumidityChart data={points} height="45vh" syncId="dashboard" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
