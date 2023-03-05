import React from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Page404 from "./Page404";
import Home from "./Home";
import Cart from "./Cart";
import ItemFull from "./components/ItemFull";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart/" element={<Cart />} />
        <Route path="item/:id" element={<ItemFull />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
