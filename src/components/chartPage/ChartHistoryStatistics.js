import React, { Fragment } from "react";
import PropTypes from "prop-types";

import BorderCard from "../common/BorderCard";

const ChartHistoryStatistics = ({
  maxTemperature,
  minTemperature,
  maxHumidity,
  minHumidity,
  averageTemperature,
  averageHumidity,
}) => {
  const showAny =
    averageTemperature !== undefined ||
    averageHumidity !== undefined ||
    (maxTemperature !== undefined && minTemperature !== undefined) ||
    (maxHumidity !== undefined && minHumidity !== undefined);

  return (
    <Fragment>
      {showAny && (
        <div className="row mt-3">
          {maxTemperature !== undefined && minTemperature !== undefined && (
            <div className="col-12 col-md-6 col-xl-3">
              <BorderCard
                title="Min/Maks temperatura"
                content={`${minTemperature.toFixed(
                  1
                )} / ${maxTemperature.toFixed(1)}°C`}
                color="danger"
                icon="fas fa-2x fa-thermometer-three-quarters"
                animation="grow"
              />
            </div>
          )}
          {maxHumidity !== undefined && minHumidity !== undefined && (
            <div className="col-12 col-md-6 col-xl-3 mt-3 mt-md-0">
              <BorderCard
                title="Min/Maks vlažnost"
                content={`${minHumidity.toFixed(1)} / ${maxHumidity.toFixed(
                  1
                )}%`}
                color="info"
                icon="fas fa-2x fa-tint"
                animation="grow"
              />
            </div>
          )}
          {averageTemperature !== undefined && (
            <div className="col-12 col-md-6 col-xl-3 mt-3 mt-xl-0">
              <BorderCard
                title="Prosečna temperatura"
                content={`${averageTemperature.toFixed(1)}°C`}
                color="warning"
                icon="fas fa-2x fa-thermometer-three-quarters"
                animation="grow"
              />
            </div>
          )}
          {averageHumidity !== undefined && (
            <div className="col-12 col-md-6 col-xl-3 mt-3 mt-xl-0">
              <BorderCard
                title="Prosečna vlažnost"
                content={`${averageHumidity.toFixed(1)}%`}
                color="success"
                icon="fas fa-2x fa-tint"
                animation="grow"
              />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

ChartHistoryStatistics.propTypes = {
  maxTemperature: PropTypes.number,
  minTemperature: PropTypes.number,
  maxHumidity: PropTypes.number,
  minHumidity: PropTypes.number,
  averageTemperature: PropTypes.number,
  averageHumidity: PropTypes.number,
};

export default ChartHistoryStatistics;
