import { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../context/firebase";

const useSensorState = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const [data, setData] = useState({ data: {}, loading: true });

  useEffect(
    () =>
      db.doc(`sensor/mtiv09e1`).onSnapshot((doc) => {
        setData({ data: doc.data(), loading: false });
      }),
    [db]
  );

  return [data.data, data.loading];
};

export default useSensorState;
