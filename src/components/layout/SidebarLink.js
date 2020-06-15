import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

const SidebarLink = ({ to, text, active, iconClassName }) => {
  return (
    <li
      className={classnames("nav-item", {
        active: !!active,
      })}
    >
      <Link to={to} className="nav-link">
        {!!iconClassName && <i className={iconClassName} />} <span>{text}</span>
      </Link>
    </li>
  );
};

export default SidebarLink;
