import React from "react";
import Navbar from "./Navbar";
import FeaturedSongs from "./SongsDashboard";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <FeaturedSongs />
      <Footer />
    </>
  );
}
