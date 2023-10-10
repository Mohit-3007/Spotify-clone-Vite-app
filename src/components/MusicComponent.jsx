import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useMusic } from "./ContextProvider/MusicProvider";
import MusicPlayer from "./MusicPlayer";
import headers from "../assets/config";

export default function MusicComponent() {
  const { login } = useContextProvider();
  const { musicPlayer, musicId } = useMusic();
  const navigate = useNavigate();

  return (
    <>
      
      <div className="w-[87.4087rem] h-2 fixed bottom-[5rem] right-2 left-[18.6875rem] bg-black z-10"></div>

      {!login && (
        <div className="w-[1690px] h-[4.5rem] fixed bottom-2 right-2 left-2 z-10">
          <footer className="w-[1690px] h-[4.5rem] bg-gradient-to-r from-[#AF2896] to-[#509BF5]">
            <div className="w-[1690px] h-[4.5rem] pt-[0.6875rem] pl-[0.9375rem] pr-6 pb-[0.4375rem] flex justify-between">

              {/* some content */}
              <div className="w-[39.7569rem] h-[2.7979rem] mb-1 font-figtree text-white">
                <p className="h-[1.25rem] flex justify-start items-center leading-5 text-xs uppercase tracking-widest font-semibold lead">Preview of Spotify</p>
                <p className="h-[1.5938rem] flex justify-center items-center text-base">Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
              </div>

              {/* Signup button */}
              <button className="w-[9.6131rem] h-[3rem] bg-white rounded-[31.25rem] hover:scale-[1.04]" onClick={()=>navigate("/signup")}>
                <span className="w-[9.6131rem] h-[3rem] py-2 px-7 text-black font-bold text-base flex justify-center
                 items-center  ">Sign up free</span>
              </button>

            </div>
          </footer>
        </div>
      )}

      {login && (
         <div className="w-[105.625rem] h-[4.5rem] fixed bottom-2 right-2 left-2 z-10">
          <footer className="w-[105.625rem] h-[4.5rem] bg-black">

            {musicPlayer === "active" && <MusicPlayer />}
              
            {musicPlayer === "inactive" && (
              <div className="w-[105.625rem] h-[4.5rem] flex bg-red-700">

                {/* Song image & Title, Singer & Like */}
                <div className="w-[31.1875rem]">
                  <div className="w-[31.1875rem] "></div>
                </div>
                
                {/* Music Player button Section */}
                <div className="w-[42.25rem] h-[3.4375rem]">
                  <div className="w-[42.25rem] h-[3.4375rem]">
  
                    {/* Player Buttons */}
                    <div className="w-[42.25rem] h-8 mb-2 flex justify-between">
  
                      {/* Player control_left */}
                      <div className="w-[19.125rem] h-8 flex justify-end items-start">
                        {/* svg */}
                        <button className="w-8 h-8 flex justify-center items-center text-[#4D4D4D]"></button>
                        <button className="w-8 h-8 flex justify-center items-center text-[#4D4D4D]"></button>
                      </div>
  
                      {/* Play/Pause Button */}
                      <button className="w-8 h-8 text-[#4D4D4D]">
                        {/* SVG- Play/Pause */}
                      </button>
  
                      {/* Player control_right */}
                      <div className="w-[19.125rem] h-8 flex justify-start items-center">
                        {/* svg */}
                        <button className="w-8 h-8 flex justify-center items-center text-[#4D4D4D]"></button>
                        <button className="w-8 h-8 flex justify-center items-center text-[#4D4D4D]"></button>
                      </div>
  
                    </div>
  
                    {/* Progress Bar */}
                    <div className="w-[42.25rem] h-[0.9375rem] flex">
  
                      {/* Start time */}
                      <div className="w-10 h-[0.9375rem]"></div>
  
                      {/* Music bar Status */}
                      <div className="w-[36.2625rem] h-3 flex">
  
                        {/* Hidden Label */}
                        <label className="w-[0.0625rem] h-[0.0625rem] hidden">Change Progress<input type="range" disabled /></label>
  
                        {/* Progress bar */}
                        <div className="w-[36.2625rem] h-12 flex items-center">
                          <div className="w-[36.2625rem] h-1">
                            {/*  */}
                            {/*  */}
                            {/*  */}
                          </div>
                        </div>
  
                      </div>
  
                      {/* End Time */}
                      <div className="w-10 h-[0.9375rem]"></div>
                    </div>
  
                  </div>
                </div>
  
                {/* Volume and Other Controls */}
                <div className="w-[31.7rem] h-8">
                  <div className="w-[31.7rem] h-8 flex items-center justify-end">
                    {/* Pending 1st 3 div */}
                    <button className="w-8 h-8 p-2"></button>
                    <div className="w-8 h-8"></div>
                    <div className="w-8 h-8"></div>
                    <div className="w-[7.8125rem] h-8 mr-2 flex items-center">
  
                      {/* Mute/Unmute Icon */}
                      <button className="w-8 h-8">
                        {/* SVG */}
                      </button>
                      {/* Volume Status bar */}
                      <div className="w-[5.8125rem] h-3">
                        {/* Pending */}
                      </div>
  
                    </div>
                  </div>
                </div>

              </div>
            )}
           
          </footer>
         </div>
        )
       
      }

      <div className="w-[105.7188rem] h-2 fixed bottom-0 right-2 left-2 bg-black"></div>
    </>
  );
}
