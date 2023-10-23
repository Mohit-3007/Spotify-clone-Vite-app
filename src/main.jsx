import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./components/ContextProvider/AppContextProvider.jsx";
import { MusicProvider } from "./components/ContextProvider/MusicProvider.jsx";
import { SongTrackProvider } from "./components/ContextProvider/SongTrackProvider.jsx";
import { LoginCredentialProvider } from "./components/ContextProvider/LoginCredentialProvider.jsx";






ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <MusicProvider>
        <LoginCredentialProvider>
          <SongTrackProvider>
            <App />
          </SongTrackProvider>
        </LoginCredentialProvider>
      </MusicProvider>
    </AppContextProvider>  
  </BrowserRouter>
);
