import React from "react";
import ReactDOM from "react-dom";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { CustomBrowserRouter } from "./app/layout/CustomBrowserRouter";
import { store } from "./app/store/configureStore";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <CustomBrowserRouter basename={undefined}>
      <Provider store={store}>
        <App />
      </Provider>
    </CustomBrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
