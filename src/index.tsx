import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/Store";
import { Provider } from "react-redux";

const rootItem = document.getElementById("root");

if (rootItem) {
  const root = ReactDOM.createRoot(rootItem);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
