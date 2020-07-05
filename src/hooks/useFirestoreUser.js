import { useState, useEffect, useContext } from "react";

import { FirebaseContext } from "../context/firebase";

const useFirestoreUser = (email) => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').firestore.Firestore */
  const db = firebase.db;

  const [state, setState] = useState({ user: null, loading: true });

  useEffect(
    () =>
      db.doc(`users/${email}`).onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setState({ user: snapshot.data(), loading: false });
        } else {
          db.doc(`users/${email}`).set({
            sendAlerts: false,
            lastAlertTime: -1,
          });
        }
      }),
    [db, email]
  );

  return [state.user, state.loading];
};

export default useFirestoreUser;
