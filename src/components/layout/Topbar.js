import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  const unauthenticatedLinks = (
    <li className="nav-item mx-1">
      <Link to="/" className="nav-link">
        <i className="fas fa-fw fa-sign-in-alt" />
        <span className="ml-1 text-gray-500">Login</span>
      </Link>
    </li>
  );

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <ul className="navbar-nav ml-auto">{unauthenticatedLinks}</ul>
    </nav>
  );
};

export default Topbar;
