import Header from "../components/Header";
import Popup from "../components/Popup";
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
