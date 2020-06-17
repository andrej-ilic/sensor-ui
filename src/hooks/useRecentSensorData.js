import { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../context/firebase";
import { getCurrentDate, getPreviousDate, getNextDate } from "../util";

const useRecentSensorData = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;
  const [todayData, setTodayData] = useState({});
  const [yesterdayData, setYesterdayData] = useState({});
  const [tomorrowData, setTomorrowData] = useState({});
  const [todayLoaded, setTodayLoaded] = useState(false);
  const [yesterdayLoaded, setYesterdayLoaded] = useState(false);
  const [tomorrowLoaded, setTomorrowLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [previousDate, setPreviousDate] = useState(getPreviousDate());
  const [tomorrowDate, setTomorrowDate] = useState(getNextDate());

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${currentDate}`).onSnapshot((doc) => {
        setTodayData(doc.data());
        setTodayLoaded(true);
      }),
    [db, currentDate]
  );

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${previousDate}`).onSnapshot((doc) => {
        setYesterdayData(doc.data());
        setYesterdayLoaded(true);
      }),
    [db, previousDate]
  );

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${tomorrowDate}`).onSnapshot((doc) => {
        setTomorrowData(doc.data());
        setTomorrowLoaded(true);
        setCurrentDate(getCurrentDate());
        setPreviousDate(getPreviousDate());
        setTomorrowDate(getNextDate());
      }),
    [db, tomorrowDate]
  );

  const getPoints = () =>
    [
      ...(!!todayData && !!todayData.data ? todayData.data : []),
      ...(!!yesterdayData && !!yesterdayData.data ? yesterdayData.data : []),
      ...(!!tomorrowData && !!tomorrowData.data ? tomorrowData.data : []),
    ]
      .filter(
        (x) =>
          !isNaN(x.t) && !isNaN(x.h) && x.ts >= Date.now() - 1000 * 60 * 60 * 24
      )
      .sort((a, b) => a.ts - b.ts);

  return [getPoints, todayLoaded && yesterdayLoaded && tomorrowLoaded];
};

export default useRecentSensorData;
