import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "./ContextProvider/AppContextProvider";
import { useMusic } from "./ContextProvider/MusicProvider";
import MusicPlayer from "./MusicPlayer";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { FaCirclePause } from "react-icons/fa6";
import { GoUnmute, GoMute } from "react-icons/go";

export default function MusicComponent() {
  const { login } = useContextProvider();
  const { musicPlayer } = useMusic();
  const navigate = useNavigate();
  const [ mute, setMute ] = useState(false);
  const [ hover, setHover ] = useState(false);
  const [ volume, setVolume ] = useState(0.5);

  function handleMouseEnter(){
    setHover(true);
  }

  function handleMouseLeave(){
    setHover(false);
  }

  function handleUnMute(){
    setMute(false);
    setVolume(0.5)
  }

  function handleMute(){
    setMute(true);
    setVolume(0);
  }

  const handleChange = (e) => {
    setVolume(Number(e.target.value));
  };
  console.log("Volume  ",volume)

  useEffect(()=>{
    if(volume>0){
      setMute(false);
    }
  }, [volume])

  return (
    <>     
      <div className="w-[calc(100% - 307px)] h-2 hidden sm:block fixed bottom-[5rem] Z-20 right-2 left-[18.6875rem] bg-black"></div>
      
      {!login && (
        <div className="w-[calc(100% - 16px)] h-[4.5rem] hidden sm:block fixed bottom-2 right-2 left-2 z-10">

          <footer className="h-[4.5rem] bg-gradient-to-r from-[#AF2896] to-[#509BF5]">
            <div className="h-[4.5rem] pt-[0.6875rem] pl-[0.9375rem] pr-6 pb-[0.4375rem] flex justify-between">

              {/* some content */}
              <div className="w-[39.7569rem] h-[2.7979rem] mb-1 font-figtree text-white">
                <p className="h-[1.25rem] flex justify-start items-center leading-5 text-xs uppercase tracking-widest font-semibold lead">Preview of Spotify</p>
                <p className="h-[1.5938rem] flex justify-center items-center text-base">Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
              </div>

              {/* Signup button */}
              <button className="w-[11.125rem] h-[3rem] bg-white rounded-[31.25rem] hover:scale-[1.04]" onClick={()=>navigate("/signup")}>
                <span className="w-[11.125rem] h-[3rem] py-2 px-7 text-black font-bold text-base flex justify-center
                 items-center  ">Sign up for free</span>
              </button>

            </div>
          </footer>

        </div>
        )
      }

      {(login && musicPlayer === "inactive")  && (
        <div className="hidden sm:block w-[calc(100% - 16px)] h-[4.5rem] fixed bottom-2 right-2 left-2 z-10">
          <footer className="h-[4.5rem] bg-black"> 
            <div className="w-[100%] h-[4.5rem] flex items-center">

              {/* Song image & Title, Singer & Like */}
              <div className="w-[30.02%]"></div>
                            
              {/* Music Player button Section */}
              <div className="w-[39.95%] h-[3.4375rem]">
                <div className="w-[100%] h-[3.4375rem]">

                  {/* Player Buttons */}
                  <div className="w-[100%] h-8 mb-2 flex justify-between">
                    {/* Player control_left */}
                    <div className="w-[45.26%] h-8 flex justify-end items-start">
                        {/* svg */}
                        <button className="w-8 h-8 flex justify-center items-center text-[#4D4D4D]"></button>
                        <button className="w-8 h-8 flex justify-center items-center text-[#4D4D4D]"><MdSkipPrevious className="w-full h-full" /></button>
                    </div>
                    {/* Play/Pause Button */}
                    <button className="w-8 h-8 text-[#4D4D4D] flex justify-center items-center">
                        {/* SVG- Play/Pause */}
                        <FaCirclePause className="w-8 h-8" />
                    </button>
                    {/* Player control_right */}
                    <div className="w-[45.26%] h-8 flex justify-start items-center">
                        {/* svg */}
                        <button className="w-8 h-8 flex justify-center items-center text-[#4D4D4D]"><MdSkipNext className="w-full h-full" /></button>
                        <button className="w-8 h-8 flex justify-center items-center text-[#4D4D4D]"></button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-[100%] h-[0.9375rem] flex items-center justify-between">

                    {/* Start time */}
                    <div className="w-10 h-[0.9375rem] text-[0.6875rem] text-[#4D4D4D] flex items-center justify-end">-:--</div>

                    {/* Music bar Status */}
                    <div className="w-[85.76%] h-3 flex">
                        {/* Progress bar */}
                        <div className="w-[100%] h-3 flex items-center">
                          <div className="w-[100%] h-1 bg-[#4D4D4D] rounded-xl "></div>
                        </div>
                    </div>

                    {/* End Time */}
                    <div className="w-10 h-[0.9375rem] text-[0.6875rem] text-[#4D4D4D] flex items-center justify-start">-:--</div>

                  </div>
                </div>
              </div>
  
              {/* Volume and Other Controls */}
              <div className="w-[30.03%] h-8">
                <div className="w-[100%] h-8 flex items-center justify-end">
                  <div className="w-[7.8125rem] h-8 mr-2 flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {/* Mute/Unmute Icon */}
                    <button className="w-8 h-8 flex justify-center items-center" >
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
                            value={volume}
                            onChange={handleChange}
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
                </div>
              </div>
  
            </div>                         
          </footer>
        </div>
      )}

      {(login && musicPlayer === "active") && (
        <div className="w-[calc(100% - 16px)] h-[4.5rem] fixed bottom-[70px] sm:bottom-2 right-2 left-2 z-10">
          <footer className="h-[4.5rem] bg-[#363232] sm:bg-black">
            <MusicPlayer />
          </footer>
        </div>
      )}

      <div className="w-[calc(100% - 307px)] h-2 hidden sm:block fixed bottom-0 z-10 right-2 left-2 bg-black"></div>
    </>
  );
}
