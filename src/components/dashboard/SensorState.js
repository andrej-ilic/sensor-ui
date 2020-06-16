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
      <div className="col-12 col-lg-3">
        <div className="row">
          <div className="col-12">
            <BorderCard
              title="Temperature"
              content={`${temperature.toFixed(1)} °C`}
              color="danger"
              icon="fas fa-2x fa-thermometer-three-quarters"
              animation="grow"
            />
          </div>
          <div className="col-12 mt-3">
            <BorderCard
              title="Humidity"
              content={`${humidity.toFixed(1)}% `}
              color="info"
              icon="fas fa-2x fa-tint"
              animation="grow"
            />
          </div>
          <div className="col-12 mt-3">
            <BorderCard
              title="Avg. temperature (today)"
              content={`${averageTemperature.toFixed(1)}% `}
              color="warning"
              icon="fas fa-2x fa-thermometer-three-quarters"
              animation="grow"
            />
          </div>
          <div className="col-12 mt-3">
            <BorderCard
              title="Avg. humidity (today)"
              content={`${averageHumidity.toFixed(1)}% `}
              color="success"
              icon="fas fa-2x fa-tint"
              animation="grow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

SensorState.propTypes = {
  temperature: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  averageTemperature: PropTypes.number.isRequired,
  averageHumidity: PropTypes.number.isRequired,
};

export default SensorState;
