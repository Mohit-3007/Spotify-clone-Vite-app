import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useMusic } from "./ContextProvider/MusicProvider";
import headers from "../assets/config";
import { BsHeartFill, BsPlayCircleFill } from "react-icons/bs";
import { FaCirclePause } from "react-icons/fa6";


const defaultAudioUrl =
  "https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf94e347ae38c3e33a7247.mp3";

  // title": "Story-8 S3 Vikshipt"

export default function MusicComponent() {
  const { login } = useContextProvider();
  const { musicPlayer, musicStatus, musicId, musicDispatch } = useMusic();
  const navigate = useNavigate();

  const [ audioUrl, setAudioUrl ] = useState("");
  const [ musicObj, setMusicObj ] = useState({});

  console.log("Music Component- audioUrl & musicObj", audioUrl, " ", musicObj)

//  useEffect(()=>{
   const [play, { pause, stop, duration }] = useSound(audioUrl, {
    volume: 1,
  })
  
//  },[musicId])

  const isFirstTimeRender = useRef(true);
  const [ isCapable, setIscapable ] = useState(false);
  
  function handlePause(){
    // pause()
    musicDispatch({ type: "pause" })
  }

  function handlePlay(){
    // pause()
    musicDispatch({ type: "play" })
  }

  useEffect(()=>{
    if(musicId){
      console.log("MusicID in MusicComponent  ", musicId);
      musicDispatch({ type: "pause" });
      stop()
      setAudioUrl(defaultAudioUrl);
      setIscapable(false);
      fetch(`https://academics.newtonschool.co/api/v1/music/song/${musicId}`,{
        headers: headers,
      })
      .then((resp) => resp.json())
      .then((rs) => {
        setMusicObj(rs.data);
        setAudioUrl(rs.data.audio_url);
        musicDispatch({ type: "play" });
      })

      return () => stop();

    }

  },[musicId])


  useEffect(() => {
    if (duration > 0) {
      // if (isFirstTimeRender.current) {
      //   isFirstTimeRender.current = false;
      //   return;
      // }
      play();
      if (musicStatus === "play") setIscapable(true);
    }
    
    return () => stop();

  }, [duration]);

  useEffect(() => {
    if (!isCapable) {
      if (musicStatus === "play") play();
      else pause();
    }
  }, [musicStatus]);


  

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

            {musicPlayer === "active" && (
              <div className="w-[105.625rem] h-[4.5rem] flex items-center">

                {/* Song image & Title, Singer & Like */}
                <div className="w-[31.75rem] p-2 h-[3.5rem]">
                  <div className="w-[31.1875rem] h-[3.5rem] flex">

                    {/* Image */}
                    <div className="w-[3.5rem] h-[3.5rem] mr-2"><img className="w-[3.5rem] h-[3.5rem]" src={musicObj?.thumbnail} /></div>

                    {/* Title & Singer */}
                    <div className="w-[21.75rem] h-[2.1875rem] mx-2">

                      {/* Title */}
                      <div className="w-[21.75rem] h-[1.25rem] pl-1.5 pr-3">
                        <span><a className="text-white font-figtree text-sm hover:underline">{musicObj?.title}</a></span>
                      </div>

                      {/* Singers */}
                      <div className="w-[21.75rem] h-[0.9375rem]">
                        <div className="w-[16.0313rem] h-[0.9375rem] pl-1.5 pr-3 text-[#b3b3b3] font-figtree text-[0.6875rem]">
                          {/* Singer Span Map Function */}
                        </div>
                      </div>

                    </div>

                    {/* Like heart */}
                    <button className="w-8 h-8 py2">
                      <span className="w-4 h-4"><BsHeartFill /></span>
                    </button> 

                  </div>
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
                      <button className="w-8 h-8 text-[#4D4D4D] flex justify-center items-center">
                        {/* SVG- Play/Pause */}
                        {musicStatus === "pause" && <span w-8 h-8 onClick={handlePause}><FaCirclePause /></span>}
                        {musicStatus === "play" && <span w-8 h-8 onClick={handlePlay}><BsPlayCircleFill /></span>}
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
