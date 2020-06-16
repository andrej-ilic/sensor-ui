import React, { useContext, useState, useEffect } from "react";

import { FirebaseContext } from "../context/firebase";
import { UserContext } from "../context/user";

import FullscreenSpinner from "../components/layout/FullscreenSpinner";

const withAuthentication = (Component) => (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').auth.Auth */
  const auth = firebase.auth;

  useEffect(
    () =>
      auth.onAuthStateChanged((authUser) => {
        setUser(authUser);
        setIsLoading(false);
      }),
    [auth]
  );

  return (
    <UserContext.Provider value={user}>
      {isLoading ? <FullscreenSpinner /> : <Component {...props} />}
    </UserContext.Provider>
  );
};

export default withAuthentication;
