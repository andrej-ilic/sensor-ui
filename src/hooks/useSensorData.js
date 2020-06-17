import { useContext, useState, useEffect, useRef } from "react";

import { FirebaseContext } from "../context/firebase";

const useSensorData = (initialDay) => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const dataRef = useRef({});
  const [day, setDay] = useState(initialDay);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.doc(`sensor/mtiv09e1/data/${day}`)
      .get()
      .then((doc) => {
        dataRef.current = doc.data();
        setLoading(false);
      });
  }, [db, day]);

  return [dataRef.current, loading, setDay];
};

export default useSensorData;
