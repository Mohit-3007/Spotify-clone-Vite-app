import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Premium from "./components/Premium";
import PasswordReset from "./components/PasswordReset";
import ChangePassword from "./components/ChangePassword";



function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleEmail(value){
    console.log("handler");
    setEmail(value);
  }

  function handlePassword(value){
    console.log("handler");
    setPassword(value);
  }

  function handleName(value){
    console.log("handler");
    setName(value);
  }



  return (
    <>
        <div className="bg-black h-screen w-screen p-2 relative overflow-x-hidden">
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<Login  handleEmail={handleEmail}
                                                  handlePassword={handlePassword}
                                                  email={email}
                                                  password={password}
                                                  />} />
            <Route path="/signup" element={<Signup handleEmail={handleEmail}
                                                  handlePassword={handlePassword}
                                                  handleName={handleName}
                                                  email={email}
                                                  password={password}
                                                  name={name}  />} />

            <Route path="/passwordreset" element={<PasswordReset />} />
            <Route path="/changepassword" element={<ChangePassword email={email} name={name} />} />
            <Route path="/more-made4u" element={<Home />} />
            <Route path="/more-new-releases" element={<Home />} />
            <Route path="/more-trending-songs" element={<Home />} />
            <Route path="/more-soul-soother" element={<Home />} />
            <Route path="/more-evergreen-melodies" element={<Home />} />
            <Route path="/more-happy" element={<Home />} />
            <Route path="/more-romantic" element={<Home />} />
            <Route path="/more-sad" element={<Home />} />
            <Route path="/more-excited" element={<Home />} />
            <Route path="/more-artist" element={<Home  />} />
            <Route path="/songtrack" element={<Home />} />
            <Route path="/artist-track" element={<Home />} />
            <Route path="/liked-songs" element={<Home />} />
            <Route path="/premium" element={<Premium />} />
          </Routes>
        </div>
    </>
  );
}

export default App;
