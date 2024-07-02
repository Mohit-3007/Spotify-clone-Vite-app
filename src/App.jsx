import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Premium from "./components/Premium";
import PasswordReset from "./components/PasswordReset";
import ChangePassword from "./components/ChangePassword";
import StayTuned from "./components/StayTuned";
import { useContextProvider } from "./components/ContextProvider/AppContextProvider";

function App() {
  function ProtectedRoute({ children }) {
    const { login } = useContextProvider();
    if (!decodeURIComponent(document.cookie)) {
      return <Navigate to={"/login"} />;
    }
    return children;
  }

  function ProtectedLoginRoute({ children }) {
    const { login } = useContextProvider();
    if (decodeURIComponent(document.cookie)) {
      return <Navigate to={"/"} />;
    } else {
      return children;
    }
  }

  return (
    <div className="bg-black h-screen max-w-full w-screen p-0 sm:p-2 relative overflow-x-auto scrollbar-none ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/login"
          element={
            <ProtectedLoginRoute>
              <Login />
            </ProtectedLoginRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedLoginRoute>
              <Signup />
            </ProtectedLoginRoute>
          }
        />
        <Route
          path="/passwordreset"
          element={
            <ProtectedLoginRoute>
              <PasswordReset />
            </ProtectedLoginRoute>
          }
        />
        <Route
          path="/changepassword"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/more-made4u"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/more-new-releases"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/more-trending-songs"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/more-soul-soother"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/more-evergreen-melodies"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/more-happy"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/more-romantic"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/more-sad"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/more-excited"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/more-artist"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/songtrack"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artist-track"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/liked-songs"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stay-tuned"
          element={
            <ProtectedRoute>
              <StayTuned />
            </ProtectedRoute>
          }
        />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </div>
  );
}

export default App;
