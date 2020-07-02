import React, { useContext, useState, useEffect } from "react";

import { FirebaseContext } from "../context/firebase";
import { UserContext } from "../context/user";

import FullscreenSpinner from "../components/layout/FullscreenSpinner";

const withAuthentication = (Component) => (props) => {
  const [state, setState] = useState({ user: null, loading: true });

  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').auth.Auth */
  const auth = firebase.auth;

  useEffect(
    () =>
      auth.onAuthStateChanged((authUser) => {
        setState({ user: authUser, loading: false });
      }),
    [auth]
  );

  return (
    <UserContext.Provider value={state.user}>
      {state.loading ? <FullscreenSpinner /> : <Component {...props} />}
    </UserContext.Provider>
  );
};

export default withAuthentication;
