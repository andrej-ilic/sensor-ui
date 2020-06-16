import moment from "moment";

const getCurrentDate = () => moment().format("YYYYMMDD");

const getPrevioudDate = () =>
  getDateFromUnixTime(Date.now() - 1000 * 60 * 60 * 24);

const getDateFromUnixTime = (time) => moment(time).format("YYYYMMDD");

export { getCurrentDate, getPrevioudDate, getDateFromUnixTime };
