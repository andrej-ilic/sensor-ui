import { useState, useEffect, useContext, useRef } from "react";

import { FirebaseContext } from "../context/firebase";
import { getCurrentDate, getPreviousDate, getNextDate } from "../util";

const useRecentSensorData = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const todayRef = useRef({});
  const yesterdayRef = useRef({});
  const tomorrowRef = useRef({});
  const [todayLoaded, setTodayLoaded] = useState(false);
  const [yesterdayLoaded, setYesterdayLoaded] = useState(false);
  const [tomorrowLoaded, setTomorrowLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [previousDate, setPreviousDate] = useState(getPreviousDate());
  const [tomorrowDate, setTomorrowDate] = useState(getNextDate());

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${currentDate}`).onSnapshot((doc) => {
        todayRef.current = doc.data();
        setTodayLoaded(true);
      }),
    [db, currentDate]
  );

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${previousDate}`).onSnapshot((doc) => {
        yesterdayRef.current = doc.data();
        setYesterdayLoaded(true);
      }),
    [db, previousDate]
  );

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${tomorrowDate}`).onSnapshot((doc) => {
        tomorrowRef.current = doc.data();
        setTomorrowLoaded(true);
        setCurrentDate(getCurrentDate());
        setPreviousDate(getPreviousDate());
        setTomorrowDate(getNextDate());
      }),
    [db, tomorrowDate]
  );

  const getPoints = () =>
    [
      ...(!!todayRef.current && !!todayRef.current.data
        ? todayRef.current.data
        : []),
      ...(!!yesterdayRef.current && !!yesterdayRef.current.data
        ? yesterdayRef.current.data
        : []),
      ...(!!tomorrowRef.current && !!tomorrowRef.current.data
        ? tomorrowRef.current.data
        : []),
    ]
      .filter(
        (x) =>
          !isNaN(x.t) && !isNaN(x.h) && x.ts >= Date.now() - 1000 * 60 * 60 * 24
      )
      .sort((a, b) => a.ts - b.ts);

  return [getPoints, todayLoaded && yesterdayLoaded && tomorrowLoaded];
};

export default useRecentSensorData;
