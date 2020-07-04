import React from "react";
import PropTypes from "prop-types";

import BorderCard from "../common/BorderCard";

const SensorState = ({
  temperature,
  humidity,
  averageTemperature,
  averageHumidity,
}) => {
  return (
    <div className="row">
      <div className="col-12 col-md-6 col-xl-3">
        {temperature !== undefined && (
          <BorderCard
            title="Temperatura"
            content={`${temperature.toFixed(1)}°C`}
            color="danger"
            icon="fas fa-2x fa-thermometer-three-quarters"
            animation="grow"
          />
        )}
      </div>
      <div className="col-12 col-md-6 col-xl-3 mt-3 mt-md-0">
        {averageTemperature !== undefined && (
          <BorderCard
            title="Prosečna temperatura (danas)"
            content={`${averageTemperature.toFixed(1)}°C`}
            color="warning"
            icon="fas fa-2x fa-thermometer-three-quarters"
            animation="grow"
          />
        )}
      </div>
      <div className="col-12 col-md-6 col-xl-3 mt-3 mt-xl-0">
        {humidity !== undefined && (
          <BorderCard
            title="Vlažnost"
            content={`${humidity.toFixed(1)}%`}
            color="info"
            icon="fas fa-2x fa-tint"
            animation="grow"
          />
        )}
      </div>
      <div className="col-12 col-md-6 col-xl-3 mt-3 mt-xl-0">
        {averageHumidity !== undefined && (
          <BorderCard
            title="Prosečna vlažnost (danas)"
            content={`${averageHumidity.toFixed(1)}%`}
            color="success"
            icon="fas fa-2x fa-tint"
            animation="grow"
          />
        )}
      </div>
    </div>
  );
};

SensorState.propTypes = {
  temperature: PropTypes.number,
  humidity: PropTypes.number,
  averageTemperature: PropTypes.number,
  averageHumidity: PropTypes.number,
};

export default SensorState;
