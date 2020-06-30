import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../context/firebase";

const useWarnings = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const [state, setState] = useState({ data: null, loading: true });

  useEffect(() => {
    db.doc(`sensor/mtiv09e1/data/warnings`).onSnapshot((doc) => {
      setState({ data: doc.data(), loading: false });
    });
  }, [db]);

  return [state.data, state.loading];
};

export default useWarnings;
