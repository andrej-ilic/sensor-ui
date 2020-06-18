import React, { Fragment, useState } from "react";
import "react-day-picker/lib/style.css";

import useSensorState from "../../hooks/useSensorState";
import useSensorData from "../../hooks/useSensorData";
import {
  getCurrentDateUnixTime,
  getDateUnixTime,
  getDateFromUnixTime,
} from "../../util";

import Spinner from "../common/Spinner";
import CustomDayPickerInput from "../common/CustomDayPickerInput";
import ChartHistoryCharts from "./ChartHistoryCharts";
import ChartHistoryStatistics from "./ChartHistoryStatistics";

const ChartHistory = () => {
  const [selectedDay, setSelectedDay] = useState(
    new Date(getCurrentDateUnixTime())
  );
  const [sensor, sensorLoading] = useSensorState();
  const [data, dataLoading, setDay] = useSensorData(
    getDateFromUnixTime(selectedDay)
  );

  const handleDayChange = (day) => {
    setSelectedDay(new Date(getDateUnixTime(day)));
    setDay(getDateFromUnixTime(getDateUnixTime(day)));
  };

  return (
    <div className="row mb-3">
      <div className="col-12">
        <h3 className="text-gray-700">Chart history</h3>
      </div>
      {sensorLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="col-12">
            <CustomDayPickerInput
              value={selectedDay}
              onChange={handleDayChange}
              dayPickerProps={{
                selectedDays: selectedDay,
                disabledDays: [
                  {
                    before: new Date(sensor.firstDayTimestamp),
                    after: new Date(),
                  },
                ],
              }}
            />
          </div>
          {!dataLoading && (
            <div className="col-12">
              <ChartHistoryStatistics {...data} />
              <ChartHistoryCharts data={data.data} />
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ChartHistory;
