import { Header } from "../components";
import { Popup } from "../components";
import { Outlet } from "react-router-dom";
import React from "react";

const MainLayout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
        <Popup />
      </div>
    </div>
  );
};

export default MainLayout;
