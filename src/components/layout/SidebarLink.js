import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";
import isMobile from "is-mobile";

import { LayoutContext } from "../../context/layout";

const SidebarLink = ({ to, text, active, iconClassName }) => {
  const { toggleSidebar } = useContext(LayoutContext);

  const handleClick = () => {
    if (isMobile()) {
      toggleSidebar();
    }
  };

  return (
    <li
      className={classnames("nav-item", {
        active: !!active,
      })}
    >
      <Link to={to} className="nav-link" onClick={handleClick}>
        {!!iconClassName && <i className={iconClassName} />} <span>{text}</span>
      </Link>
    </li>
  );
};

SidebarLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  iconClassName: PropTypes.string,
};

export default SidebarLink;
