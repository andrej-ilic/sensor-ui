import React, { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Content from "./components/layout/Content";

import withAuthentication from "./hoc/withAuthentication";
import { LayoutContext } from "./context/layout";

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);

  const layoutContextValue = {
    isSidebarCollapsed,
    isSidebarToggled,
    toggleSidebar: () => setIsSidebarToggled(!isSidebarToggled),
    toggleSidebarCollapsed: () => setIsSidebarCollapsed(!isSidebarCollapsed),
    hideSidebar: () => setIsSidebarCollapsed(true),
    showSidebar: () => setIsSidebarCollapsed(false),
  };

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      <div id="wrapper">
        <Sidebar />
        <Content />
      </div>
    </LayoutContext.Provider>
  );
};

export default withAuthentication(App);
