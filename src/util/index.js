import moment from "moment";

const getCurrentDate = () => moment().format("YYYYMMDD");

const getPreviousDate = () =>
  getDateFromUnixTime(Date.now() - 1000 * 60 * 60 * 24);

const getNextDate = () => getDateFromUnixTime(Date.now() + 1000 * 60 * 60 * 24);

const getDateFromUnixTime = (time) => moment(time).format("YYYYMMDD");

const getCurrentDateUnixTime = () =>
  Math.floor(getUnixTimeInLocalTimezone(new Date()) / (1000 * 60 * 60 * 24)) *
  24 *
  60 *
  60 *
  1000;

const getDateUnixTime = (date) =>
  Math.floor(getUnixTimeInLocalTimezone(date) / (1000 * 60 * 60 * 24)) *
  24 *
  60 *
  60 *
  1000;

const getUnixTimeInLocalTimezone = (d) =>
  d.getTime() + d.getTimezoneOffset() * -60000;

export {
  getCurrentDate,
  getPreviousDate,
  getNextDate,
  getDateFromUnixTime,
  getCurrentDateUnixTime,
  getDateUnixTime,
};
