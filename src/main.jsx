import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./components/ContextProvider/AppContextProvider.jsx";
import { MusicProvider } from "./components/ContextProvider/MusicProvider.jsx";
import { LoginCredentialProvider } from "./components/ContextProvider/LoginCredentialProvider.jsx";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <MusicProvider>
        <LoginCredentialProvider>
            <ScrollToTopOnRouteChange />
            <App />
        </LoginCredentialProvider>
      </MusicProvider>
    </AppContextProvider>  
  </BrowserRouter>
);

