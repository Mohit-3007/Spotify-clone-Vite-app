import React from "react";
import { useState, useEffect, } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import CardObj from "../assets/CardObj";
import Sidebar from "./Sidebar";
import MusicComponent from "./MusicComponent";
import BottomBar from "./BottomBar";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import SearchResult from "./SearchResult";


export default function SearchPage() {
    const { login } = useContextProvider();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [showSearchRes , setShowSearchRes] = useState(false);

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

    function handleShowSearchResult(){
        setShowSearchRes(true);
    }
    function handleHideSearchResult(){
        setShowSearchRes(false);
    }

 
    return (
        <>
        <Sidebar />
        {screenWidth < 640 ? "" :
            <Navbar handleShowSearchResult={handleShowSearchResult} handleHideSearchResult={handleHideSearchResult} showSearchRes={showSearchRes} />}

        {showSearchRes == true ? <SearchResult /> : <CardObj />  }
        <MusicComponent />

        {/* For small screens */}
        {login && screenWidth < 640 ? <BottomBar /> : null}
     
        </>
    )
}