import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";

import SidebarLink from "./SidebarLink";
import ROUTE from "../../util/routes";

import { LayoutContext } from "../../context/layout";

const Sidebar = () => {
  const path = useLocation().pathname;
  const { isSidebarToggled, isSidebarCollapsed, toggleSidebar } = useContext(
    LayoutContext
  );

  return (
    <ul
      className={classnames(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion",
        { toggled: isSidebarToggled, collapse: isSidebarCollapsed }
      )}
    >
      <Link
        to={ROUTE.DASHBOARD}
        className="sidebar-brand d-flex align-items-center justify-content-center"
      >
        Sensor tracker
      </Link>
      <hr className="sidebar-divider mb-0" />
      <SidebarLink
        to={ROUTE.DASHBOARD}
        text="Dashboard"
        iconClassName="fas fa-fw fa-tachometer-alt"
        active={path === ROUTE.DASHBOARD}
      />
      <hr className="sidebar-divider" />
      <div className="text-center d-none d-md-inline">
        <button
          id="sidebarToggle"
          className="rounded-circle border-0"
          onClick={toggleSidebar}
        ></button>
      </div>
    </ul>
  );
};

export default Sidebar;
