import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../context/firebase";

const useSensorData = (initialDay) => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const [data, setData] = useState({});
  const [day, setDay] = useState(initialDay);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.doc(`sensor/mtiv09e1/data/${day}`)
      .get()
      .then((doc) => {
        setData(doc.data());
        setLoading(false);
      });
  }, [db, day]);

  return [data, loading, setDay];
};

export default useSensorData;
