import { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../context/firebase";

const useSensorState = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;
  const [loading, setLoading] = useState(true);
  const [sensor, setSensor] = useState({});

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1`).onSnapshot((doc) => {
        setSensor(doc.data());
        setLoading(false);
      }),
    [db]
  );

  return [sensor, loading];
};

export default useSensorState;
