import React, { useContext, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";
import isMobile from "is-mobile";
import UNICLogo from "./unic.png";

import { LayoutContext } from "../../context/layout";
import ROUTE from "../../util/routes";
import useUser from "../../hooks/useUser";

import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const path = useLocation().pathname;
  const { isSidebarToggled, isSidebarCollapsed, toggleSidebar } = useContext(
    LayoutContext
  );
  const { isAuthenticated } = useUser();

  const handleLogoClick = () => {
    if (isMobile()) {
      toggleSidebar();
    }
  };

  const unauthenticatedContent = (
    <Fragment>
      <SidebarLink
        to={ROUTE.REGISTER}
        text="Registruj se"
        iconClassName="fas fa-user-plus"
        active={path === ROUTE.REGISTER}
      />
      <SidebarLink
        to={ROUTE.LOGIN}
        text="Prijavi se"
        iconClassName="fas fa-fw fa-sign-in-alt"
        active={path === ROUTE.LOGIN}
      />
    </Fragment>
  );

  const authenticatedContent = (
    <SidebarLink
      to={ROUTE.WARNINGS}
      text="Upozoravanje"
      iconClassName="fas fa-exclamation-triangle"
      active={path === ROUTE.WARNINGS}
    />
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
        onClick={handleLogoClick}
      >
        <div className="sidebar-brand-icon">
          <img
            className="img-fluid"
            src={UNICLogo}
            alt="Logo"
            style={{ maxWidth: "3.75rem" }}
          />
        </div>
        <div className="sidebar-brand-text">UNIC monitoring</div>
      </Link>
      <hr className="sidebar-divider mb-0" />
      <SidebarLink
        to={ROUTE.DASHBOARD}
        text="Status senzora"
        iconClassName="fas fa-fw fa-tachometer-alt"
        active={path === ROUTE.DASHBOARD}
      />
      <SidebarLink
        to={ROUTE.IP_CAMERA}
        text="IP kamera"
        iconClassName="fas fa-fw fa-video"
        active={path === ROUTE.IP_CAMERA}
      />
      <SidebarLink
        to={ROUTE.CHART_HISTORY}
        text="Istorija"
        iconClassName="fas fa-fw fa-chart-line"
        active={path === ROUTE.CHART_HISTORY}
      />
      {isAuthenticated && authenticatedContent}
      {!isAuthenticated && unauthenticatedContent}
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
