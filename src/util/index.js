import moment from "moment";

const getCurrentDate = () => moment().format("YYYYMMDD");

const getPreviousDate = () =>
  getDateFromUnixTime(Date.now() - 1000 * 60 * 60 * 24);

const getNextDate = () => getDateFromUnixTime(Date.now() + 1000 * 60 * 60 * 24);

const getDateFromUnixTime = (time) => moment(time).format("YYYYMMDD");

export { getCurrentDate, getPreviousDate, getNextDate, getDateFromUnixTime };
