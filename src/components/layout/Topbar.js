import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import ROUTE from "../../util/routes";
import useUser from "../../hooks/useUser";
import { FirebaseContext } from "../../context/firebase";

const Topbar = () => {
  const firebase = useContext(FirebaseContext);
  /** @type import('firebase/app').auth.Auth */
  const auth = firebase.auth;

  const signOut = () => {
    auth.signOut();
  };

  const { user, isAuthenticated } = useUser();

  const unauthenticatedContent = (
    <li className="nav-item">
      <Link to={ROUTE.LOGIN} className="nav-link">
        <i className="fas fa-fw fa-sign-in-alt" />
        <span className="ml-1 text-gray-500">Login</span>
      </Link>
    </li>
  );

  let authenticatedContent;

  if (isAuthenticated) {
    authenticatedContent = (
      <Fragment>
        <li className="nav-item">
          <Link to={ROUTE.LOGIN} className="nav-link">
            <span className="ml-1 text-gray-500">{user.email}</span>
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link btn" onClick={() => signOut()}>
            <i className="fas fa-fw fa-sign-out-alt" />
            <span className="ml-1 text-gray-500">Logout</span>
          </button>
        </li>
      </Fragment>
    );
  }

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">
        {isAuthenticated ? authenticatedContent : unauthenticatedContent}
      </ul>
    </nav>
  );
};

export default Topbar;
