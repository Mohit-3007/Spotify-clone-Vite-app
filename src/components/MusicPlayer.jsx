import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSound from "use-sound";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useMusic } from "./ContextProvider/MusicProvider";
import headers from "../assets/config";
import { BsHeartFill, BsPlayCircleFill } from "react-icons/bs";
import { FaCirclePause } from "react-icons/fa6";

const defaultAudioUrl =
  "https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf94e447ae38c3e33a7253.mp3";

  // title": "Story-10 S3 Beemar"

export default function MusicPlayer(){

//   const { login } = useContextProvider();
  const {  musicStatus, musicId, musicDispatch } = useMusic();

  const [ audioUrl, setAudioUrl ] = useState(defaultAudioUrl);
  const [ musicObj, setMusicObj ] = useState({});

  // useEffect(()=>{
  //   setAudioUrl(defaultAudioUrl);
  // },[])

  console.log("Line -23 URL & musicObj ", audioUrl, " ", musicObj)

  const [play, { pause, stop, duration }] = useSound(audioUrl, {
    volume: 1,
    onLoad: () => {
      console.log("Duration Inside useSound:", duration);
    },
  })
  console.log("Line- 28 DURATION ", duration);   

  
  const isFirstTimeRender = useRef(true);
  const [ isCapable, setCapable ] = useState(false);
  
  function handlePause(){
    console.log("Pause");
    musicDispatch({ type: "pause" })
  }

  function handlePlay(){
    // pause()
    console.log("Play");
    musicDispatch({ type: "play" })
  }

  useEffect(()=>{
    if(musicId){
      console.log("Line- 46 MusicID   ", musicId);
      musicDispatch({ type: "pause" });
      stop()
      setAudioUrl(defaultAudioUrl);
      setCapable(false);
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
    // console.log("if (duration > 0) before", duration )
    if (duration > 0) {
      // console.log("if (duration > 0) before", duration )
      if (isFirstTimeRender.current) {
        isFirstTimeRender.current = false;
        return;
      }
      play();
      if (musicStatus === "play") setCapable(true);
    }
    
    return () => stop();

  }, [duration]);

  useEffect(() => {
    console.log("Line- 82 Capability ", isCapable)
    if (isCapable) {
      if (musicStatus === "play") play();
      else pause();
    }
  }, [musicStatus]);

  // Convert duration to minutes and seconds
  function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.round(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  const durationInSeconds = duration / 1000;
  const formattedDuration = formatDuration(durationInSeconds);
  console.log("Line- 107 Formated duration",formattedDuration);

    return (
        <div className="w-[105.625rem] h-[4.5rem] flex items-center">

            {/* Song image & Title, Singer & Like */}
            <div className="w-[31.75rem] pl-2 h-[3.5rem]">
                <div className="w-[31.1875rem] h-[3.5rem] flex">

                    {/* Image */}
                    <div className="w-[3.5rem] h-[3.5rem] mr-2"><img className="w-[3.5rem] h-[3.5rem]" src={musicObj?.thumbnail} /></div>

                    {/* Title & Singer */}
                    <div className="w-fit h-[2.1875rem] my-auto mx-2">
                      {/* Title */}
                      <div className="w-fit h-[1.25rem] pl-1.5 pr-3 flex items-center">
                          <span><a className="text-white font-figtree flex items-center text-sm hover:underline">{musicObj?.title}</a></span>
                      </div>

                      {/* Singers */}
                      <div className="w-fit h-[0.9375rem]">
                          <div className="w-fit h-[0.9375rem] pl-1.5 pr-3 flex items-center text-[#b3b3b3] font-figtree text-[0.6875rem]">
                          {/* Singer Span Map Function */}
                          {musicObj?.artist?.map((each, index) => {
                            return (
                              <div key={index} className="h-6 font-bold flex items-center">
                                {index != 0 && (
                                  <span className="h-[15px] w-[6px] flex justify-start items-end font-extrabold">,</span>
                                )}
                                 <span className="mr-[2px]">{each.name}</span>
                              </div>
                    );
                          })}
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
                        {musicStatus === "pause" ? (<BsPlayCircleFill onClick={handlePlay} className="w-8 h-8" />) 
                        :
                        (<FaCirclePause onClick={handlePause} className="w-8 h-8" />)}

                        {/* {musicStatus === "pause" && <span className="w-8 h-8" onClick={handlePause}><FaCirclePause /></span>}
                        {musicStatus === "play" && <span className="w-8 h-8" onClick={handlePlay}><BsPlayCircleFill /></span>} */}

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
    )

}