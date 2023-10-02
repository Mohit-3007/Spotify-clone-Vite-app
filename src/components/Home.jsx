import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import useSound from "use-sound";
import Navbar from "./Navbar";
import MoreFeatured from "./MoreFeatured";
import SpotifyDashboard from "./SpotifyDashboard";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MoreAlbums from "./MoreAlbums";
import ArtistSongs from "./ArtistSongs";
import SongTrack from "./SongTrack";


export default function Home() {
  const location = useLocation();
  const [path, setPath] = useState("");
  const [musicCardData, setMusicCardData] = useState(null);

  // const [play, { stop }] = useSound(musicCardData?.audio_url);

  const DataFromMusicCard = (data) => {
    setMusicCardData(data);
  };

  useEffect(() => { 
    // console.log("hello", location);
    setPath(location.pathname)
  }, [location])
  
  // console.log("path", path);


  return (
    <>
      <Sidebar />
      {path !== "/songtrack" && <Navbar />} 
      
      {path === "/" ? <SpotifyDashboard DataFromMusicCard={DataFromMusicCard}
        // play={play}
        // stopp={stop}
      /> :
        path === "/featured" ? <MoreFeatured DataFromMusicCard={DataFromMusicCard} /> :
        path === "/morealbums" ? <MoreAlbums /> :
        path === "/songtrack" ? <SongTrack /> :
        <ArtistSongs /> 
      }
      <Footer musicCardData={musicCardData}
        // play={play}
        // stop={stop}
      />
      
      
    </>
  );
}


