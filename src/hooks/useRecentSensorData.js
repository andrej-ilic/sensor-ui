import { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../context/firebase";
import { getCurrentDate, getPrevioudDate } from "../util";

const useRecentSensorData = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;
  const [todayData, setTodayData] = useState({});
  const [yesterdayData, setYesterdayData] = useState({});
  const [todayLoaded, setTodayLoaded] = useState(false);
  const [yesterdayLoaded, setYesterdayLoaded] = useState(false);

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${getCurrentDate()}`).onSnapshot((doc) => {
        setTodayData(doc.data());
        setTodayLoaded(true);
      }),
    [db]
  );

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1/data/${getPrevioudDate()}`).onSnapshot((doc) => {
        setYesterdayData(doc.data());
        setYesterdayLoaded(true);
      }),
    [db]
  );

  const getPoints = () =>
    [...todayData.data, ...yesterdayData.data]
      .filter(
        (x) =>
          !isNaN(x.t) && !isNaN(x.h) && x.ts >= Date.now() - 1000 * 60 * 60 * 24
      )
      .sort((a, b) => a.ts - b.ts);

  return [getPoints, todayLoaded && yesterdayLoaded];
};

export default useRecentSensorData;
