import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./i18n";
import { setupStore } from "./redux/Store";

const rootItem = document.getElementById("root");

if (rootItem) {
  const root = ReactDOM.createRoot(rootItem);
  root.render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
