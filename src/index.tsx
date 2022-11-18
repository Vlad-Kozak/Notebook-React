import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="140932991070-c5qt3l0ev9onjv5717s26coc4fddbdb2.apps.googleusercontent.com">
          <Provider store={store}>
            <App />
          </Provider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </PersistGate>
  </React.StrictMode>
);
