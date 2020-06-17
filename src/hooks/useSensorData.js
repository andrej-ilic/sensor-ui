import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../context/firebase";

const useSensorData = (initialDay) => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const [data, setData] = useState({ data: {}, loading: true });
  const [day, setDay] = useState(initialDay);

  useEffect(() => {
    db.doc(`sensor/mtiv09e1/data/${day}`)
      .get()
      .then((doc) => {
        setData({ data: doc.data(), loading: false });
      });
  }, [db, day]);

  return [data.data, data.loading, setDay];
};

export default useSensorData;
