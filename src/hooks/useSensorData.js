import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../context/firebase";

const useSensorData = (initialDay) => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const [data, setData] = useState({ data: [], loading: true });
  const [dateRange, setDateRange] = useState({
    from: initialDay,
    to: initialDay,
  });

  useEffect(() => {
    db.collection(`sensor/mtiv09e1/data`)
      .where("timestamp", ">=", dateRange.from.getTime())
      .where("timestamp", "<=", dateRange.to.getTime())
      .get()
      .then((docs) => {
        const results = [];
        docs.forEach((doc) => results.push(doc.data()));
        setData({ data: results, loading: false });
      });
  }, [db, dateRange]);

  return [data.data, data.loading, setDateRange];
};

export default useSensorData;
