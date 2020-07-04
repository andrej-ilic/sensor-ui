import { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../context/firebase";
import {
  getCurrentDate,
  getPreviousDate,
  getNextDate,
  savePointsToCSV,
} from "../util";

const useRecentSensorData = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const [todayData, setTodayData] = useState({
    data: undefined,
    loading: true,
  });
  const [yesterdayData, setYesterdayData] = useState({
    data: undefined,
    loading: true,
  });
  const [tomorrowData, setTomorrowData] = useState({
    data: undefined,
    loading: true,
  });
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [previousDate, setPreviousDate] = useState(getPreviousDate());
  const [tomorrowDate, setTomorrowDate] = useState(getNextDate());

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${currentDate}`).onSnapshot((doc) => {
        setTodayData({ data: doc.data(), loading: false });
      }),
    [db, currentDate]
  );

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${previousDate}`).onSnapshot((doc) => {
        setYesterdayData({
          data: doc.data(),
          loading: false,
        });
      }),
    [db, previousDate]
  );

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${tomorrowDate}`).onSnapshot((doc) => {
        setTomorrowData({ data: doc.data(), loading: false });
        setCurrentDate(getCurrentDate());
        setPreviousDate(getPreviousDate());
        setTomorrowDate(getNextDate());
      }),
    [db, tomorrowDate]
  );

  const getPoints = () =>
    [
      ...(!!todayData && !!todayData.data && !!todayData.data.data
        ? todayData.data.data
        : []),
      ...(!!yesterdayData && !!yesterdayData.data && !!yesterdayData.data.data
        ? yesterdayData.data.data
        : []),
      ...(!!tomorrowData && !!tomorrowData.data && !!tomorrowData.data.data
        ? tomorrowData.data.data
        : []),
    ]
      .filter(
        (x) =>
          !isNaN(x.t) && !isNaN(x.h) && x.ts >= Date.now() - 1000 * 60 * 60 * 24
      )
      .sort((a, b) => a.ts - b.ts);

  const downloadAsCSV = () => {
    savePointsToCSV(getPoints(), `UNIC_monitoring_data_${Date.now()}.csv`);
  };

  return [
    getPoints,
    todayData.loading || yesterdayData.loading || tomorrowData.loading,
    downloadAsCSV,
  ];
};

export default useRecentSensorData;
