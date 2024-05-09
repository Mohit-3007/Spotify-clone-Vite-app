import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useSound from "use-sound";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useMusic } from "./ContextProvider/MusicProvider";
import headers from "../assets/config";
import { BsHeartFill, BsFillPlayFill, BsPlayCircleFill } from "react-icons/bs";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaCirclePause } from "react-icons/fa6";
import { RiPictureInPictureFill } from "react-icons/ri";
import { GoUnmute, GoMute } from "react-icons/go"
import { RxCross1 } from "react-icons/rx"
import { FiExternalLink } from "react-icons/fi";

const defaultAudioUrl =
  "https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf94e447ae38c3e33a7253.mp3";
  // title": "Story-10 S3 Beemar"

export default function MusicPlayer(){
  const {  musicStatus, musicId, musicDispatch, isPlaying, handleIsPlaying, setCurrentTime, currentTime, handleCurrentTime } = useMusic();
  const [ audioUrl, setAudioUrl ] = useState(defaultAudioUrl);
  const [ musicObj, setMusicObj ] = useState({});
  const [ volume, setVolume ] = useState(0.5); 
  const [ mute, setMute ] = useState(false);
  const [ hover, setHover ] = useState(false);
  const [ pictureIn, setPictureIn ] = useState(false); 
  const [ showPip, setShowPip ] = useState(false);
  const type= "false";
  // const [duration, setDuration] = useState(0);
 

  console.log("Line -31 audioURL ", audioUrl)
  console.log("Line 32 && MusicObj ", musicObj)
  
  const [play, { pause, stop, duration, seek, volume: currentVolume }] = useSound(audioUrl, {
    volume,
    onload: () => {
      console.log("Song Loaded ", duration);     
    },
    onplay: () => {
      console.log("Song Playing  "); 
      handleIsPlaying(true)    
      
    },
    onend: () => {
      console.log("Song Ended");
      function changeState(){
        musicDispatch({ type: "pause" })
        handleIsPlaying(false)
        setCurrentTime(0)
      }
      changeState()
    },
    onpause: () => {
      console.log("Song paused");
    },
  })
  
  const isFirstTimeRender = useRef(true);
  const [ isCapable, setCapable ] = useState(false);
 
  function handlePause(){
    console.log("Pause");
    musicDispatch({ type: "pause" })
    handleIsPlaying(false)
  }

  function handlePlay(){
    console.log("Play");
    musicDispatch({ type: "play" })
    handleIsPlaying(true)
  }

  useEffect(()=>{
    pause()
    handleIsPlaying(false);
  },[])

  useEffect(()=>{
    if(musicId){
      console.log("Line- 46 MusicID   ", musicId);
      musicDispatch({ type: "pause" });
      setCurrentTime(0)
      // stop()
      // setAudioUrl(defaultAudioUrl);
      setCapable(false);
      fetch(`https://academics.newtonschool.co/api/v1/music/song/${musicId}`,{
        headers: headers,
      })
      .then((resp) => resp.json())
      .then((rs) => {
        setMusicObj(rs.data);
        setAudioUrl(rs.data.audio_url);
        musicDispatch({ type: "play" });  
        // setIsPlaying(true);
        // handleIsPlaying(true)
      })
      return () => stop();
    }
  },[musicId])

  useEffect(() => {
    console.log("DURATION", duration)
    if (duration > 0) {
      if (isFirstTimeRender.current) {
        console.log("First Time Render" );
        isFirstTimeRender.current = false;
        return;
      }
      play(); 
      // handleIsPlaying(true)
      console.log("2nd time render")
      if (musicStatus === "play") setCapable(true);
    }
    return () => stop();
  }, [duration]);

  useEffect(() => {
    console.log("Line- 82 Capability ", isCapable)
    if (isCapable) {
      // console.log(musicStatus,"musicStatus")
      if (musicStatus === "play"){
        play();
      } 
      else pause();
    }
  }, [musicStatus]);

  function handleMouseEnter(){
    setHover(true);
  }
  function handleMouseLeave(){
    setHover(false);
  }
  function handleUnMute(){
    setMute(false);
    setVolume(0.3)
  }
  function handleMute(){
    setMute(true);
    setVolume(0);
  }
  useEffect(()=>{
    if(volume>0){
      setMute(false);
    }
  }, [volume])

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
      <div className="w-[100%] h-[4.5rem] flex items-center">

            {/* Song image & Title, Singer & Like */}
            <div className="w-[100%] sm:w-[30.02%] pl-2 h-[3.5rem]">
              <div className="w-[100%] h-[3.5rem] flex">
                  {/* Image */}
                  <div className="w-[3.5rem] h-[3.5rem] mr-2"><img className="w-[3.5rem] h-[3.5rem]" src={musicObj?.thumbnail} /></div>
                  {/* Title & Singer */}
                  <div className="w-[calc(100%-88px)] h-[2.1875rem] my-auto mx-2">

                    {/* Title */}
                    <Link to={"/songtrack"} state={{data: musicObj?._id +"&"+ type}} className="w-[100%] overflow-hidden h-[1.25rem] pl-1.5 pr-3 flex items-center">
                      <span><a className="text-white font-figtree flex items-center truncate text-sm hover:underline">{musicObj?.title}</a></span>
                    </Link>

                    {/* Singers */}
                    <div className="w-full h-[30px] ">
                        <div className="w-full h-[30px] pl-1.5 pr-3 flex items-center text-[#b3b3b3] font-figtree text-[0.6875rem] ">
                          {/* Singer Span Map Function */}
                          {musicObj?.artist?.map((each, index) => {
                            return  <CurrentSongArtist key={index} each={each} index={index} />       
                          })}
                        </div>
                    </div>
                  </div>
                  {/* Like heart */}
                  <AddToFavourite musicObj={musicObj} />  
              </div>
            </div>
                          
            {/* <audio controls src={""} style={{ width: '100%' }} /> */}
            {/* Music Player button Section */}
            <div className="hidden sm:block w-[39.95%] h-[3.4375rem]">
              <div className="w-[100%] h-[3.4375rem]">

                {/* Player Buttons */}
                <div className="w-[100%] h-8 mb-2 flex justify-between">

                  {/* Player control_left */}
                  <div className="w-[45.26%] h-8 flex justify-end items-start">
                      <button className="w-8 h-8 flex justify-center items-center text-[#B3B3B3]"></button>
                      <button className="w-8 h-8 flex justify-center items-center text-[#B3B3B3]"><MdSkipPrevious className="w-full h-full" /></button>
                  </div>

                  {/* Play/Pause Button */}
                  <button className="w-8 h-8 text-white flex justify-center items-center">
                      {/* SVG- Play/Pause */}
                      {musicStatus === "pause" ? (<BsPlayCircleFill onClick={handlePlay} className="w-8 h-8" />) 
                      :
                      (<FaCirclePause onClick={handlePause} className="w-8 h-8" />)}

                      {/* {musicStatus === "pause" && <span className="w-8 h-8" onClick={handlePause}><FaCirclePause /></span>}
                      {musicStatus === "play" && <span className="w-8 h-8" onClick={handlePlay}><BsPlayCircleFill /></span>} */}

                  </button>

                  {/* Player control_right */}
                  <div className="w-[45.26%] h-8 flex justify-start items-center">
                      <button className="w-8 h-8 flex justify-center items-center text-[#B3B3B3]"><MdSkipNext className="w-full h-full" /></button>
                      <button className="w-8 h-8 flex justify-center items-center text-[#B3B3B3]"></button>
                  </div>

                </div>

                {/* Progress Bar */}
                <ProgessBar formattedDuration={formattedDuration}
                            durationInSeconds={durationInSeconds} 
                />
              </div>
            </div>

            {/* Volume and Other Controls */}
            <div className="hidden sm:block w-[30.03%] h-8 relative">
              <div className="w-[100%] h-8 flex items-center justify-end">

                {/* Mute Icon & Volume Icon */}
                <div className="w-[7.8125rem] h-8 mr-2 flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  {/* Mute/Unmute Icon */}
                  <button className="w-8 h-8 flex justify-center items-center">
                    {mute ? <GoMute  className={"w-5 h-5 stroke-1 " + (hover ? "stroke-white" : "stroke-[#4D4D4D]")} onClick={handleUnMute} /> :
                      <GoUnmute className={"w-5 h-5 stroke-1 " + (hover ? "stroke-white" : "stroke-[#4D4D4D]")} onClick={handleMute} />
                    }
                  </button>
                  {/* Volume Status bar */}
                  <div className="w-[5.8125rem] h-8 flex items-center">
                    <div className="w-full flex items-center relative">
                      <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={currentVolume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="h-[6px] w-full opacity-0 z-30 cursor-pointer"
                      />
                      <div className="w-full h-[6px] bg-[#4D4D4D] rounded-lg absolute top-0 left-0 cursor-pointer">
                        <div 
                            className={"h-[6px] rounded-lg " + (hover ? "bg-[#1ED760]" : "bg-white")} 
                            style={{
                              width: `${volume * 100}%`, 
                              position: 'absolute', 
                              top: '0',
                              left: '0',
                          }} 
                        ></div>
                      </div>
                    </div>  
                  </div>
                </div>

                {/* Pop up Picture in Picture Icon */}
                <button className=" hidden lg:flex w-8 h-8 p-3 justify-center items-center"
                    onMouseEnter={()=> setPictureIn(true)}
                    onMouseLeave={()=> setPictureIn(false)}
                    onClick={() => setShowPip(true)}
                >
                  <span className="w-5 h-5 flex justify-center items-center">
                    <RiPictureInPictureFill color={pictureIn ? "white" : "#A7A7A7"} className="w-5 h-5 " />
                  </span>
                </button>

                {/* Small div of Picture in Picture */}
                <div className={"flex h-7 w-fit items-center rounded-md px-3 text-sm text-white bg-[#282828] absolute -top-14 right-3 z-20 " 
                  + (pictureIn ? "block" : "hidden") }>Picture in Picture
                </div>

                {/* PoP-Up Pip DIV */}

                <div className={"w-80 h-80 absolute -top-72 right-1 z-40 " + (showPip ? "block" : "hidden")}
                   onMouseEnter={()=> setHover(true)}
                   onMouseLeave={()=> setHover(false)}
                >
                  <div className="w-80 h-80 p-4 blur-sm rounded-md"
                    style={{ backgroundImage: `url(${musicObj?.thumbnail})`}}>                    
                  </div>

                  <div className={"w-72 h-72 bg-contain absolute right-4 bottom-4 rounded-md " + (hover ? "blur-sm" : "")}
                    style={{ backgroundImage: `url(${musicObj?.thumbnail})` }}>
                  </div>

                  {hover && (
                    <>
                      <div className="absolute top-4 right-4 cursor-pointer">
                        <RxCross1 className="w-6 h-6 text-white hover:scale-110" onClick={() => setShowPip(false)} />
                      </div>
                      <div className="cursor-pointer bg-[#121212] absolute top-[152px] right-24 h-8 px-3 bg-opacity-80 rounded-3xl text-white text-base
                        font-semibold flex justify-center items-center" onClick={() => setShowPip(false)}>
                        Back to tab <FiExternalLink className="ml-2 h-5 w-5" />
                      </div>
                    </>
                  )}

                </div>

              </div>
          </div>

      </div>
    )
}

function ProgessBar({ formattedDuration, durationInSeconds }){
  const { currentTime, handleCurrentTime, isPlaying, setCurrentTime } = useMusic();
  const [ barWidth, setBarWidth ] = useState(0)
  const clickRef = useRef();

  useEffect(()=>{
    let intervalId;

      if(isPlaying){
        intervalId = setInterval(()=>{
            // setCurrentTime((prev) => prev + 1 )
            handleCurrentTime()
        }, 1000 )
      }

      else if(!isPlaying && currentTime !== 0 ){
        clearInterval(intervalId)
      }
      return () => clearInterval(intervalId);
  },[ isPlaying, currentTime, formattedDuration ])

  useEffect(()=>{
    const divProgress = currentTime / durationInSeconds * 100;
    setBarWidth(divProgress);
  }, [currentTime])

  console.log("barWidth  ",  barWidth);

  console.log("currentTime     currentTime   ",currentTime)

  const checkWidth = (e)=> {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    console.log(width);
    console.log(offset);

    const divprogress = offset / width * 100;
    // audioElem.current.currentTime = divprogress / 100 * currentSong.length;
  }
  

  return (
    <div className="w-[100%] h-[0.9375rem] flex items-center justify-between">

      {/* Start time */}
      <div className="w-10 h-[0.9375rem] text-[0.6875rem] text-[#6a6a6a] flex items-center justify-end">{currentTime}</div>

      {/* Music bar Status */}
      <div className="w-[85.79%] h-3 flex">

          {/* Hidden Label */}
          <label className="w-[0.0625rem] h-[0.0625rem] hidden">Change Progress<input type="range" disabled /></label>

          {/* Progress bar */}
          <div className="w-[100%] h-3 flex items-center">
            <div className="w-[100%] h-1 bg-[#ffffff4d] rounded-xl " onClick={checkWidth} ref={clickRef}>
                {/* Responsive progress bar */}
                <div className="h-full rounded-xl bg-[#fff] hover:bg-[#1db954]" style={{width: `${barWidth+"%"}`}}></div>
            </div>
          </div>

      </div>

      {/* End Time */}
      <div className="w-10 h-[0.9375rem] text-[0.6875rem] text-[#6a6a6a] flex items-center justify-start">{formattedDuration}</div>

    </div>
  )
}

function CurrentSongArtist({each, index}){

  return (
    <Link to="/artist-track" state={{id: each?._id}}
      className=" w-fit h-[30px] font-bold flex items-start truncate hover:underline"
    >
      {index != 0 && (
        <span className="mr-1h-[15px] w-[6px] flex justify-start items-end font-extrabold">,</span>
      )}
      {each.name}
    </Link>
  )
}

function AddToFavourite({musicObj}){
  const { likedSongIds, handleFavSongId }= useContextProvider();
  const [ selected, setSelected ]= useState(false);
  const [path, setPath] = useState();
  const location = useLocation();

  useEffect(()=>{
    setPath(location.pathname)
  },[])

  useEffect(()=>{
    const isPresent = likedSongIds?.songs?.find((eachID)=>{
      return eachID._id == musicObj?._id
    })
    // console.log(index," Index ",isPresent)
    if(isPresent) setSelected(true)
  },[likedSongIds, path])


  function handleLikedState(songId){
    handleFavSongId(songId)
    if(selected) setSelected(!selected)
  }

  return (
    <div className="w-8 h-[3.5rem] flex items-center">
      <button className="w-8 h-8 py-2 flex justify-center items-center" onClick={()=>handleLikedState(musicObj?._id)}>
        <span className="w-4 h-4"><BsHeartFill className={"w-4 h-4 hover:stroke-white hover:scale-110 " + (selected ? "fill-[#1ED760]" : "fill-white")} /></span>
      </button> 
    </div>
  )

}