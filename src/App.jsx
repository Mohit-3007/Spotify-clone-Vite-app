import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SearchPage from "./components/SearchPage";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Premium from "./components/Premium";



// import Navbar from "./components/Navbar";
// import SongsDashboard from "./components/SongsDashboard";
// import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";
// import FeaturedMusic from "./components/FeaturedMusic";

function App() {
  return (
    <>
      <div className="bg-black h-screen w-screen p-2">
        {/* <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<SongsDashboard />} />
          <Route path="" element={} />
          <Route path="" element={} />
        </Routes> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/featured" element={<Home />} />
          <Route path="/songtrack" element={<Home />} />
          <Route path="/artistsongs" element={<Home  />} />
          <Route path="/morealbums" element={<Home />} />
          <Route path="/premium" element={<Premium />} />
        </Routes>
      </div>

    
    </>
  );
}

export default App;
