import React from "react";
import { useState, useEffect, useRef } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import useSound from "use-sound";
import Navbar from "./Navbar";
import SpotifyDashboard from "./SpotifyDashboard";
import Sidebar from "./Sidebar";
import MusicComponent from "./MusicComponent";
import SongTrack from "./SongTrack";
import ArtistTrack from "./ArtistTrack";
import MoreNewReleases from "./MoreSongs/MoreNewReleases";
import MoreMade4U from "./MoreSongs/MoreMade4U";
import MoreTrendingSongs from "./MoreSongs/MoreTrendingSongs"
import MoreSoulSoother from "./MoreSongs/MoreSoulSoother"
import MoreEvergreenMelodies from "./MoreSongs/MoreEvergreenMelodies"
import MoreHappy from "./MoreSongs/MoreHappy"
import MoreRomantic from "./MoreSongs/MoreRomantic"
import MoreSad from "./MoreSongs/MoreSad"
import MoreExcited from "./MoreSongs/MoreExcited"
import MoreArtist from "./MoreSongs/MoreArtist"
import LikedSongs from "./LikedSongs";
import BottomBar from "./BottomBar";
import { useContextProvider } from "./ContextProvider/AppContextProvider";



export default function Home() {
  const { login } = useContextProvider();
  const location = useLocation();
  const [path, setPath] = useState("")
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      console.log("resizing........")
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => { 
    setPath(location.pathname)
  }, [location])

  return (
    <>
      <Sidebar />
      {/* For small screens*/}
      {login && screenWidth > 640 ? <Navbar /> : null}
      
      {!login && <Navbar /> }

     
      { path === "/" ? <SpotifyDashboard /> :
        path === "/more-made4u" ? <MoreMade4U /> :
        path === "/more-new-releases" ? <MoreNewReleases /> :
        path === "/more-trending-songs" ? <MoreTrendingSongs /> :
        path === "/more-soul-soother" ? <MoreSoulSoother /> :
        path === "/more-evergreen-melodies" ? <MoreEvergreenMelodies /> :
        path === "/more-happy" ? <MoreHappy /> :
        path === "/more-romantic" ? <MoreRomantic /> :
        path === "/more-sad" ? <MoreSad /> :
        path === "/more-excited" ? <MoreExcited /> :
        path === "/more-artist" ? <MoreArtist /> :
        path === "/liked-songs" ? <LikedSongs /> :
        path === "/artist-track" ? <ArtistTrack /> :
        <SongTrack /> 
      }
     
      <MusicComponent />

      {/* For small screens*/}
      {login && screenWidth < 640 ? <BottomBar /> : null}

    </>
  );
}


