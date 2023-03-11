import React from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Loadable from "react-loadable";
import PaymentPage from "./pages/PaymentPage";
import { CirclesWithBar } from "react-loader-spinner";
import Page404 from "./pages/Page404";
import ItemFull from "./pages/ItemFull";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => (
    <CirclesWithBar
      height="100"
      width="100"
      color="#537EF5"
      wrapperStyle={{ justifyContent: "center" }}
      wrapperClass=""
      visible={true}
      outerCircleColor=""
      innerCircleColor=""
      barColor=""
      ariaLabel="circles-with-bar-loading"
    />
  ),
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart/" element={<Cart />} />
        <Route path="item/:id" element={<ItemFull />} />
        <Route path="payment/" element={<PaymentPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
