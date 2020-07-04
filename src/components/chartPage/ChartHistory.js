import React, { Fragment, useState } from "react";
import "react-day-picker/lib/style.css";
import MomentLocateUtils from "react-day-picker/moment";
import "moment/locale/sr";

import useSensorState from "../../hooks/useSensorState";
import useSensorData from "../../hooks/useSensorData";
import { getCurrentDateUnixTime, getDateUnixTime } from "../../util";

import Spinner from "../common/Spinner";
import CustomDayPickerInput from "../common/CustomDayPickerInput";
import ChartHistoryCharts from "./ChartHistoryCharts";
import ChartHistoryStatistics from "./ChartHistoryStatistics";

const ChartHistory = () => {
  const [dayFrom, setDayFrom] = useState(new Date(getCurrentDateUnixTime()));
  const [dayTo, setDayTo] = useState(new Date(getCurrentDateUnixTime()));
  const [sensor, sensorLoading] = useSensorState();
  const [data, dataLoading, setDateRange, downloadAsCSV] = useSensorData(
    new Date(getCurrentDateUnixTime())
  );
  const [changed, setChanged] = useState(false);

  const handleDayFromChange = (day) => {
    setDayFrom(new Date(getDateUnixTime(day)));
    setChanged(true);
  };

  const handleDayToChange = (day) => {
    setDayTo(new Date(getDateUnixTime(day)));
    setChanged(true);
  };

  const confirmRangeSelect = () => {
    setDateRange({
      to: dayTo,
      from: dayFrom,
    });
    setChanged(false);
  };

  return (
    <Fragment>
      <div className="row mb-3 mb-md-0">
        <div className="col-12 col-md-6">
          <h3 className="text-gray-700">Istorija</h3>
        </div>
        <div className="col-12 col-md-6">
          <button
            className="btn btn-primary btn-sm btn-icon-split float-none float-md-right animated--grow-in"
            onClick={downloadAsCSV}
          >
            <span className="icon text-white-50">
              <i className="fas fa-download"></i>
            </span>
            <span className="text">Preuzmi CSV</span>
          </button>
        </div>
      </div>
      <div className="row mb-3">
        {sensorLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className="col-12">
              <span className="font-weight-bold mr-2">Od:</span>
              <CustomDayPickerInput
                value={dayFrom}
                onChange={handleDayFromChange}
                dayPickerProps={{
                  localeUtils: MomentLocateUtils,
                  locale: "sr",
                  selectedDays: dayFrom,
                  disabledDays: [
                    {
                      before: new Date(sensor.firstDayTimestamp),
                      after: dayTo,
                    },
                  ],
                }}
              />
              <span className="font-weight-bold mx-2">Do:</span>
              <CustomDayPickerInput
                value={dayTo}
                onChange={handleDayToChange}
                dayPickerProps={{
                  localeUtils: MomentLocateUtils,
                  locale: "sr",
                  selectedDays: dayTo,
                  disabledDays: [
                    {
                      before: dayFrom,
                      after: new Date(),
                    },
                  ],
                }}
              />
              {changed && (
                <div
                  className="btn btn-primary mx-2"
                  onClick={confirmRangeSelect}
                >
                  Potvrdi
                </div>
              )}
            </div>
            {!dataLoading && (
              <div className="col-12">
                {data.length === 1 && <ChartHistoryStatistics {...data[0]} />}
                {data.length > 0 && (
                  <ChartHistoryCharts data={data.map((x) => x.data).flat(1)} />
                )}
                {data.length === 0 && (
                  <h3 className="my-3 text-center">
                    Nema podataka za izabran interval
                  </h3>
                )}
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default ChartHistory;
