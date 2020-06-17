import { useState, useEffect, useContext, useRef } from "react";

import { FirebaseContext } from "../context/firebase";

const useSensorState = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const dataRef = useRef({});
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1`).onSnapshot((doc) => {
        dataRef.current = doc.data();
        setLoading(false);
      }),
    [db]
  );

  return [dataRef.current, loading];
};

export default useSensorState;
