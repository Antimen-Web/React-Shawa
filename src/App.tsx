import React from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Loadable from "react-loadable";
import PaymentPage from "./pages/PaymentPage";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
  loading: () => <div>Идёт загрузка...</div>,
});
const ItemFull = Loadable({
  loader: () => import(/* webpackChunkName: "ItemFull" */ "./pages/ItemFull"),
  loading: () => <div>Идёт загрузка...</div>,
});
const Page404 = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Page404"),
  loading: () => <div>Идёт загрузка...</div>,
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
