import React, { Fragment } from "react";
import PropTypes from "prop-types";

import BorderCard from "../common/BorderCard";
import ChartHistoryCharts from "./ChartHistoryCharts";

const ChartHistoryStatistics = ({ data }) => {
  return (
    <Fragment>
      <div className="col-12 col-md-6 col-xl-3 mt-3">
        <BorderCard
          title="Avg. temperature"
          content={`${data.averageTemperature.toFixed(1)} °C`}
          color="danger"
          icon="fas fa-2x fa-thermometer-three-quarters"
          animation="grow"
        />
      </div>
      <div className="col-12 col-md-6 col-xl-3 mt-3">
        <BorderCard
          title="Avg. humidity"
          content={`${data.averageHumidity.toFixed(1)}%`}
          color="info"
          icon="fas fa-2x fa-tint"
          animation="grow"
        />
      </div>
    </Fragment>
  );
};

ChartHistoryCharts.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ChartHistoryStatistics;
